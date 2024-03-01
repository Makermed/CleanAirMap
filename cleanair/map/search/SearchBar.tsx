import { SearchIcon, useMedia, Box, Input, InputField, InputIcon} from '@gluestack-ui/themed';
import { DimensionValue, StyleSheet } from 'react-native';
import { Pressable } from '@gluestack-ui/themed';
import { Feature } from "geojson";
import { useNavigation } from 'expo-router';
import { useState, useEffect } from "react";
import { viewState } from '../data/viewState';
import SearchResultList from './SearchResultList';
import queryAutocomplete from './data/queryAutocomplete';
import { BackHandler, Platform } from 'react-native';

type SearchBarProps = {
    onPickItem: (item: Feature) => void;
}


const SearchBar = ({onPickItem}: SearchBarProps) => {
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<Array<Feature>>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
    const media = useMedia();
    const navigation = useNavigation();

    // If the search results are showing, pressing the back button should close them on mobile.
    BackHandler.addEventListener('hardwareBackPress', () => {
        if ( Platform.OS == "web" ) { return false; }
        if (showSearchResults) {
            setShowSearchResults(false);
            return true;
        }
        return false;
    });
 
    useEffect(() => {
        searchTimeout && clearTimeout(searchTimeout);
        if (searchText.length <= 3) {
            if (searchText.length == 0) {
                setAutocompleteSuggestions([]);
            }
            return;
        }

        // Delay the search to avoid too many API requests when typing.
        setSearchTimeout(setTimeout(() => {
            queryAutocomplete(
                searchText,
                viewState()?.longitude,
                viewState()?.latitude)
                .then(result => {
                    setAutocompleteSuggestions(result);
                    setShowSearchResults(true);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }, 200));
    }, [searchText]);

    const pickItem = (item: Feature) => {
        onPickItem(item as Feature);
        setShowSearchResults(false);
    }

    return (
        <>
        {showSearchResults && (
                <Pressable
                    style={{...StyleSheet.absoluteFillObject}}
                    onPress={() => setShowSearchResults(false)}>
                </Pressable>)}
                <Pressable
                    position="absolute"
                    top="$6"
                    w={media.md ? 600 as DimensionValue : '90%'}
                    alignItems={media.md ? 'stretch' : 'center'}
                    alignContent={media.md ? 'stretch' : 'center'}
                    collapsable={false}
                    onFocus={() => setShowSearchResults(true)}
                    onPress={() => setShowSearchResults(true)}>
                        <Box
                        minHeight="$16"
                        alignSelf={media.md ? 'stretch' : 'center'}
                        ml={media.md ? '$12' : 'auto'}
                        w={media.md ? 600 as DimensionValue : '90%'}
                        bg='$white'
                        dark-bg='$black'
                        hardShadow={'2'}>
                        <Input minHeight="$16" flex={1} key='search-input'>
                            <InputIcon as={SearchIcon} ml='$4' h='$16' />
                            <InputField
                                h='$16'
                                key='search-input-field'
                                id='search-input-field'
                                flex={1}
                                onPressIn={() => setShowSearchResults(true)}
                                onFocus={() => setShowSearchResults(true)}
                                placeholder="Search..."
                                blurOnSubmit={false}
                                onChange={event => {setSearchText(event.nativeEvent.text)}}
                                />
                        </Input>
                        {showSearchResults && <SearchResultList
                                            data={autocompleteSuggestions}
                                            onPick={pickItem} />}
                        </Box>
                </Pressable>
        </>
    );
}


export default SearchBar;
