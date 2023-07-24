import CardContainer from "../../../common/CardContainer/CardContainer";
import { Text } from "@mantine/core";
import { Box, Divider, Group } from "@mantine/core";
import { CSSProperties } from "react";
export function Rightsection() {
  const margins: (marginTop: number) => CSSProperties = (marginTop: number) => ({
    marginTop: marginTop,

    fontWeight: "bold",
  });
  const marginsgray: CSSProperties = {
    marginTop: 10,
    color: "gray",
    fontWeight: "bold",
  };
  return (
    <CardContainer w={"100%"} h={"40rem"}>
      right
      <CardContainer w={"100%"} h={"7rem"}>
        <Group spacing={5}>
          <img
            style={{ marginTop: "0.5rem", position: "relative" }}
            src="/Ellipse15.png"
            alt="Ellipse 15"
          />
          <Text size={14} style={marginsgray}>
            146명의 사람들이 이 게임을 추천합니다!
          </Text>
        </Group>

        <Group spacing={5}>
          <img
            style={{ marginTop: "0.5rem", position: "relative" }}
            src="/Ellipse 16.png"
            alt="Ellipse 16"
          />
          <Text size={14} style={margins(10)}>
            75명의 사람들이 이 게임을 플레이 중입니다.
          </Text>
        </Group>
      </CardContainer>
      <CardContainer w={"100%"} h={"12rem"} style={{ marginTop: "3rem" }}>
        <Text style={{ paddingTop: "1rem", fontWeight: "bold" }}>SNS 바로가기</Text>

        <Group spacing={0}>
          <Box
            sx={(theme) => ({
              textAlign: "center",
              padding: "0",
              borderRadius: theme.radius.md,
              cursor: "pointer",
              width: "20rem",
              height: "5rem",
              marginTop: "1rem",
              border: "solid #8F8F8F 0.0625rem",
            })}
          >
            <Box
              sx={(theme) => ({
                textAlign: "center",
                borderTopLeftRadius: theme.radius.md,
                borderBottomLeftRadius: theme.radius.md,
                cursor: "pointer",
                width: "24.5%",
                height: "100%",
                margin: "0",

                display: "inline-block",
                borderRight: "solid #8F8F8F 0.0625rem",
                padding: "15px",
              })}
            >
              <img
                src="/Group123.png"
                height={"100%"}
                width={"100%"}
                style={{ display: "inline-block" }}
              />
            </Box>

            <Box
              sx={(theme) => ({
                textAlign: "center",
                borderTopLeftRadius: theme.radius.md,
                borderBottomLeftRadius: theme.radius.md,
                cursor: "pointer",
                width: "24.5%",
                height: "100%",
                marginRight: "0",
                display: "inline-block",
                borderRight: "solid #8F8F8F 0.0625rem",
                padding: "15px",
              })}
            >
              {" "}
              <img
                src="/image 108_layerstyle.png"
                height={"100%"}
                width={"100%"}
                style={{ display: "inline-block" }}
              />
            </Box>

            <Box
              sx={(theme) => ({
                textAlign: "center",
                padding: "15px",

                borderTopLeftRadius: theme.radius.md,
                borderBottomLeftRadius: theme.radius.md,

                cursor: "pointer",
                width: "24.5%",
                height: "100%",
                marginRight: "0",
                display: "inline-block",
                borderRight: "solid #8F8F8F 0.0625rem",
              })}
            >
              {" "}
              <img
                src="/Vector.png"
                height={"100%"}
                width={"100%"}
                style={{ display: "inline-block" }}
              />
            </Box>

            <Box
              sx={(theme) => ({
                textAlign: "center",
                borderRadius: theme.radius.md,
                cursor: "pointer",
                width: "24.5%",
                height: "5rem",
                marginRight: "0",
                display: "inline-block",
                padding: "15px",
              })}
            >
              {" "}
              <img
                src="/Group 124.png"
                height={"100%"}
                width={"100%"}
                style={{ display: "inline-block" }}
              />
            </Box>
          </Box>
        </Group>
        <Group style={{ marginTop: "3%" }}>
          <Text
            span
            style={{
              marginLeft: "9%",
              fontWeight: "bold",
              color: "gray",
              textDecoration: "underline",
              textUnderlinePosition: "under",
            }}
          >
            밥줘
          </Text>

          <Text
            span
            style={{
              marginLeft: "9%",
              fontWeight: "bold",
              color: "gray",
              textDecoration: "underline",
              textUnderlinePosition: "under",
            }}
          >
            파랑새
          </Text>

          <Text
            span
            style={{
              marginLeft: "7%",
              fontWeight: "bold",
              color: "gray",
              textDecoration: "underline",
              textUnderlinePosition: "under",
            }}
          >
            얼굴책
          </Text>

          <Text
            span
            style={{
              marginLeft: "4%",
              fontWeight: "bold",
              color: "gray",
              textDecoration: "underline",
              textUnderlinePosition: "under",
            }}
          >
            홈페이지
          </Text>
        </Group>
      </CardContainer>
    </CardContainer>
  );
}
