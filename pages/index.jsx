import * as React from 'react'
import * as PropTypes from 'prop-types'
import Link from 'next/link'
import {
  Box,
  IconButton,
  Heading,
  Image,
  Center,
  VStack,
  HStack,
  Text,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Link as StyledLink,
  useColorMode
} from '@chakra-ui/react'
import {
  RiFileSearchLine,
  RiArrowRightLine
} from 'react-icons/ri'

import Container from '../components/Container'
import Header from '../components/Header'
import Post from '../components/Post'

import * as author from '../fns/author'
import * as post from '../fns/post'

const Page = props => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Box
        background='black'
      >
        <Container>
          <Header />
        </Container>
      </Box>
      <Container>
        <VStack
          padding='65px 0'
          textAlign='center'
          spacing={1}
        >
          <Center>
            <Image
              width='95px'
              paddingRight='4px'
              src='/typed.icon.png'
            />
            <Heading
              size='2xl'
            >
              Typed.sh
            </Heading>
          </Center>
          <Text
            fontSize='16px'
            color={
              colorMode === 'light'
                ? 'gray.700'
                : 'gray.300'
            }
          >
            Just a blog, __init__?
          </Text>
          <HStack
            paddingTop='25px'
          >
            <InputGroup
              size='md'
            >
              <InputLeftElement pointerEvents='none'>
                <RiFileSearchLine />
              </InputLeftElement>
              <Input
                variant='filled'
                placeholder='Search...'
                fontSize='14px'
              />
            </InputGroup>
            <IconButton
              icon={<RiArrowRightLine />}
            />
          </HStack>
        </VStack>
      </Container>
      <Divider />
      <Container>
        <Box
          margin='28px 0'
        >
          <Post {...props.posts[0]} />
          <VStack
            margin='24px 0'
            divider={<Divider />}
            spacing={4}
            align='stretch'
          >
            {
              props.posts.map((article, key) => {
                if (!key) return null

                return (
                  <StyledLink key={key} href={'/post/' + article.slug}>
                    <Link href={'/post/' + article.slug}>
                      <Box>
                        <Heading size='lg'>
                          {article.title}
                        </Heading>
                        <Text margin='4px 0'>
                          {article.sort}
                        </Text>
                      </Box>
                    </Link>
                  </StyledLink>
                )
              })
            }
          </VStack>
        </Box>
      </Container>
    </>
  )
}

Page.propTypes = {
  posts: PropTypes.array
}

export const getStaticProps = async ctx => {
  const posts = Object
    .keys(post.getList())
    .map(slug => {
      const { data } = post.bySlug(slug)

      data.date = new Date(data.date).getTime()
      data.author = author.byId(data.author)

      return data
    })
    .sort((a, b) => {
      return b.date - a.date
    })

  return {
    props: {
      posts
    }
  }
}

export default Page