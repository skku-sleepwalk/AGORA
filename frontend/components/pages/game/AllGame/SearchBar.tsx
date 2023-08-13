import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";

export default function SearchBar() {
  return (
    <div style={{ width: "80%" }}>
      <TextInput
        radius="xl"
        rightSection={
          <div
            style={{
              borderLeft: "solid 0.5px black",
              paddingLeft: "10px",
              background: "#9E9E9E",
              height: "100%",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            <InvisibleButton>
              <IconSearch style={{ marginRight: "15px" }}></IconSearch>
            </InvisibleButton>
          </div>
        }
      ></TextInput>
    </div>
  );
}
