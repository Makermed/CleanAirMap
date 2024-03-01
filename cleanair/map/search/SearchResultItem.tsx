import { VStack, Text, Heading, Box } from '@gluestack-ui/themed';
import { Feature } from "geojson";
import { Pressable } from '@gluestack-ui/themed';

type SearchResultItemProps = {
    item: Feature;
    onPress: () => void;
};

const SearchResultItem = ({ item, onPress } : SearchResultItemProps) => {
    return (
        <Pressable $hover-bg="$coolGray100"
                   $pressed-bg="$blue100"
                   onPress={onPress}>
            <Box px="$8" py="$6">
                <VStack gap={2} space="md">
                    <Heading size="md">{item.properties?.name}</Heading>
                    <Text>{item.properties?.formatted}</Text>
                </VStack>
            </Box>
        </Pressable>
    );
}

export default SearchResultItem;