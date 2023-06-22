import { Container } from "@mantine/core"
import { Avatar } from "@mantine/core"
import { TextInput } from '@mantine/core';
import { WriteWritingStyles } from "./WriteWriting.styles";


function WriteWriting(){
    const {classes}=WriteWritingStyles()
    return(
        <Container className={classes.container}>

            <Avatar src={"https://avatars.githubusercontent.com/u/52057157?v=4" } radius="xl" size={30} display={"inline-block"}
            // pos={"relative"}
            left={150}
            top={70}
            />
            
            <TextInput
            placeholder="새로운 글을 작성해보세요."
            display={"inline-block"}
            left={160}
            top={60}
            pos={"relative"}
            
            className={classes.TextInput}
            // variant="filled"
            
            //onClick={()=>대충 아래 글}
            //크기 이슈 해결 필요
            />
        </Container>

    )
}
export default WriteWriting