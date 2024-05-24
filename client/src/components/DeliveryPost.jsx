import styled from "styled-components";


export const DeliveryPost = ({post}) => {
    return(
        <MainBlock>
            <Image src={post.image}/>
            <Title>{post.title}</Title>
            <Description>{post.description}</Description>
            {post?.advanced? <Advanced>{post.advanced}</Advanced> : null}
        </MainBlock>
    )
}

const Advanced = styled.span`
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
;
`

const Description = styled.span`
  text-align: center;
  margin: 12px;
`

const Title = styled.h3`
  text-align: center;
`

const Image = styled.img``

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
`