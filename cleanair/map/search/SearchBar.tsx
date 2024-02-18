import { Divider, SearchIcon, useMedia, Box, Input, InputField, InputSlot, InputIcon, FlatList} from '@gluestack-ui/themed';
import { useRef, useState, useEffect } from "react";
import { Feature } from "geojson";
import SearchResultItem from './SearchResultItem';
import queryAutocomplete from './data/queryAutocomplete';
import { viewState } from '../data/viewState';
import { DimensionValue } from 'react-native';
const SearchBar = ({style, onPickItem}: {style: any, onPickItem: Function}) => {
    const [listVisibility, setListVisibility] = useState<boolean>(true);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<Array<Feature>>([]);
    const [searchText, setSearchText] = useState<string>("");

    const searchBoxRef = useRef<typeof InputField>(null);
    const autofillListRef = useRef<typeof FlatList>(null);

    useEffect(() => {
        setSearchText(searchText);
        searchTimeout && clearTimeout(searchTimeout);
        const textBox : typeof InputField | null = searchBoxRef.current;
        if (textBox?.value?.length <= 3 || listVisibility == false) {
            return;
        }

        // Delay the search for a second to avoid too many API requests.
        setSearchTimeout(setTimeout(() => {
            queryAutocomplete(
                textBox?.value,
                viewState()?.longitude,
                viewState()?.latitude)
                .then(result => {
                    setAutocompleteSuggestions(result)
                });
               
        }, 1000));
    }, [searchText]);

    const media = useMedia();
    return(
        <Box position="absolute"
            top="$6"
            w={media.md ? 600 as DimensionValue : '90%'}
            alignSelf={media.md ? 'stretch' : 'center'}
            ml={media.md ? '$6' : 'auto'}
            bg='$white'
            dark-bg='$black'
            hardShadow={'2'}>
        <Input h='$16'>
            <InputIcon as={SearchIcon} ml='$4' h='$16' />
            <InputField
                placeholder="Search..."
                ref={searchBoxRef as any}
                blurOnSubmit={false}
                value={searchText}
                onBlur={() => setTimeout(() => {
                    setListVisibility(false);
                }, 300)}
                onFocus={() => setListVisibility(true)}
                onChange={event => setSearchText(event.nativeEvent.text)} placeholder="Search..." />
            </Input>
        <FlatList
            ref={autofillListRef as any}
            display={listVisibility ? "flex" : "none"}
            ItemSeparatorComponent={() => <Divider
                orientation="horizontal"
                w="80%"
                alignSelf='center'
                bg="$borderLight600"
                h={1}
                $dark-bg="$borderDark600"
              />}
            data={autocompleteSuggestions}
            renderItem={({item}) => <SearchResultItem onPress={() => onPickItem(item as Feature)} item={item as Feature} />}
            keyExtractor={(item) => (item as Feature).properties!.place_id}
        />
        </Box>);
}

export default SearchBar;
