import { Container } from "@mantine/core"
import { Avatar } from "@mantine/core"
import { TextInput } from '@mantine/core';


function WriteWriting(){
    return(
        <Container>
            hehehe
            aaa
            <Avatar src={"https://avatars.githubusercontent.com/u/52057157?v=4" } radius="xl" size={30} display={"inline-block"}
            pos={"relative"}
            top={10}
            />
            {/* 줄바꿈 없애야함 */}
            
            <TextInput
            placeholder="글을 써봅시다!"
            display={"inline-block"}
            left={10}
            pos={"relative"}
            
            //onClick={()=>대충 아래 글}
            />
        </Container>

    )
}
export default WriteWriting