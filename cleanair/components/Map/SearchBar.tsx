import { Searchbar, List } from 'react-native-paper';
import { StyleSheet, View, FlatList} from 'react-native';
import { useEffect, useState, useCallback } from "react";
import { viewState } from '../../storage/global';
import { Feature } from "geojson";

const autocomplete_endpoint = "https://api.geoapify.com/v1/geocode/autocomplete";


interface SearchBarState {
  searchText: string;
  shouldUpdateOnChange: boolean;
}

const SearchBar = ({style, onPickItem}: {style: any, onPickItem: Function}) => {
    const [autocompleteEnabled, setAutocompleteEnabled] = useState<boolean>(true);
    const [searchText, setSearchText] = useState<string>("");
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<Array<Feature>>([]);

    const selectItem = useCallback((item: Feature) => {
        // Reset autocomplete and set the value to the searched item.
        setAutocompleteEnabled(false);
        setSearchText(item.properties?.name);
        setAutocompleteSuggestions([]);
        onPickItem(item);
        setAutocompleteEnabled(true);
    }, []);

    useEffect(() => {
        // Reset the timer each time the input changes to avoid hitting the API too frequently.
        if (searchTimeout != null) {
            clearTimeout(searchTimeout);
            setSearchTimeout(null);
        }

        // Don't search until the user has typed at least 3 characters and the search is enabled.
        if (!autocompleteEnabled || searchText?.length <= 3) {
            return;
        }

        // Set a timeout to autocomplete the search after 1 second.
        setSearchTimeout(setTimeout(() => {
            console.log(searchText);
            // Add a wildcard so it matches partial words. Otherwise the bias doesn't work well.
            const query = searchText?.endsWith(" ") ? searchText : searchText + "*";
            
            // TODO: Move this to the data client and see if we can cache it.
            const suggest_request = autocomplete_endpoint
                + `?text=${encodeURIComponent(query)}`
                + `&bias=proximity:${viewState()?.longitude},${viewState()?.latitude}|countrycode:none`
                + `&type=amenity`
                + `&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_TOKEN}`;

            fetch(suggest_request)
                .then(resp => resp.json()
                    .then( data => {
                        console.log(data);
                        setAutocompleteSuggestions(data.features);
                    }))
        }, 1000));
    }, [searchText]);

    return(
    <View style={style}>
        <Searchbar
            style={styles.searchbar}
            showDivider={false}
            mode="view"
            onChangeText={text => setSearchText(text)}
            value={searchText}
            placeholder='search' />
            <FlatList
                style={styles.list}
                showsVerticalScrollIndicator={false}
                data={autocompleteSuggestions}
                renderItem={({ item }) => {
                    return (
                        <List.Item
                            title={item.properties?.name}
                            description={item.properties?.formatted}
                            onPress={() => selectItem(item)}
                        />
                    );
                }}
            />
    </View>)
}

const styles = StyleSheet.create({
    searchbar: {
        backgroundColor: 'white',
    },
    list: {
        backgroundColor: 'white',
    },
});

export default SearchBar;
