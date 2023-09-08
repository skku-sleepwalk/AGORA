import { IconChevronDown } from "@tabler/icons-react";
import CardContainer from "../../../common/CardContainer/CardContainer";
import { Checkbox, Text } from "@mantine/core";
import InvisibleButton from "../../../common/InvisibleButton/InvisibleButton";
import { useState } from "react";
export interface itemProps {
  id: string;
  checked: boolean;
}
export interface SideBarProps {
  genreList: itemProps[];
  setGenre: Function;
}
export default function SideBar({ genreList, setGenre }: SideBarProps) {
  return (
    <CardContainer style={{ height: "100%", width: "90%", paddingBottom: "2rem", margin: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginTop: "2rem" }}>
          <Text fz="xl" fw={700}>
            장르
          </Text>
        </div>
        {genreList.map((genre) => {
          return (
            <label>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10rem", marginTop: "1rem" }}
              >
                <InvisibleButton
                  onClick={() => {
                    setGenre(genre.id);
                  }}
                >
                  <div>
                    <Checkbox checked={genre.checked}></Checkbox>
                  </div>
                  <div style={{ marginLeft: "0.5rem" }}>
                    <Text fz="md">{genre.id}</Text>
                  </div>
                </InvisibleButton>
              </div>
            </label>
          );
        })}
      </div>
    </CardContainer>
  );
}
