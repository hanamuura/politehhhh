import styled from "styled-components";
import {DeliveryPost} from "./DeliveryPost";
import {CustomTextStrip} from "./UI/CustomTextStrip";


export const DeliveryPostsContainer = ({posts}) => {
    return(
        <Main>
            <CustomTextStrip>Доставка</CustomTextStrip>
            <MainBlock>
                {posts.map(post => <DeliveryPost key={post.title} post={post}/>)}
            </MainBlock>
        </Main>
    )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 160px;
`

const MainBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 45px;
`