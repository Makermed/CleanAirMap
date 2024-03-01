import { Divider, FlatList} from '@gluestack-ui/themed';
import { Feature } from "geojson";
import SearchResultItem from './SearchResultItem';

type SearchResultListProps = {
    data: Array<Feature>;
    onPick: (item : Feature) => void;
};

const SearchResultList = ({data, onPick} : SearchResultListProps) => {
        return (<FlatList
            bg='$white'
            dark-bg='$black'
            ItemSeparatorComponent={() => <Divider
                orientation="horizontal"
                w={'80%'}
                alignSelf='center'
                bg="$borderLight600"
                h={1}
                $dark-bg="$borderDark600"
            />}
            data={data}
            renderItem={({item}) => <SearchResultItem
                onPress={() => onPick(item as Feature)}
                item={item as Feature} />}
            keyExtractor={(item) => (item as Feature).properties!.place_id}
        />);
    };

export default SearchResultList;