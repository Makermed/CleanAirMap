
import React from "react"
import { Input, Card, Text, InputField, Button} from '@gluestack-ui/themed';
import { Feature} from "geojson";

const NewLocationForm = ({location} : {location : Feature}) => {
    return (
            <Card>
              <Text>{location?.properties?.name}</Text>
              <Text>{location?.properties?.formatted}</Text>
              <Input>
                <InputField placeholder="Reading" />
              </Input>
              <Button onPress={() => console.log("Submit Button")}>
                Submit
              </Button>
            </Card>
    )
  }
  
  export default NewLocationForm