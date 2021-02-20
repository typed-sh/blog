import * as React from 'react'
import * as PropTypes from 'prop-types'
import Link from 'next/link'
import {
  Box,
  Center,
  Heading,
  Text,
  Link as StyledLink,
  Divider,
  HStack,
  Avatar,
  Image
} from '@chakra-ui/react'

import Container from '../../components/Container'
import Header from '../../components/Header'
import MDXProvider from '../../components/MDXProvider'

import * as author from '../../fns/author'
import * as post from '../../fns/post'

const Page = ({ user, data, mdxModule }) => {
  return (
    <>
      <Box
        background='black'
        marginBottom='25px'
      >
        <Container>
          <Header />
        </Container>
      </Box>
      <Container width='750px'>
        <Heading size='3xl' margin='20px 0'>
          {data.title}
        </Heading>
        <Text>
          {data.sort}
        </Text>
        <Divider margin='9px 0' />
        <HStack margin='16px 0'>
          <Avatar
            name={user.name}
          />
          <Box>
            <Link href={`/author/${user.name}`}>
              <Heading
                as={StyledLink}
                size='md'
              >
                {user.name}
              </Heading>
            </Link>
            <Text>
              {user.sort}
            </Text>
          </Box>
        </HStack>
      </Container>
      {
        data.thumbnail && (
          <Container
            as={Center}
            width='1250px'
          >
            <Image
              src={data.thumbnail}
              alt={`Thumbnail image of ${data.title}.`}
              margin='45px 0'
              shadow='2xl'
              borderRadius='md'
            />
          </Container>
        )
      }
      <Container width='750px'>
        <Box margin='28px 0'>
          <MDXProvider>
            {mdxModule}
          </MDXProvider>
        </Box>
      </Container>
    </>
  )
}

Page.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  data: PropTypes.object,
  mdxModule: PropTypes.any
}

export const getStaticProps = async ctx => {
  const {
    slug
  } = ctx.params

  const { data, content } = post.bySlug(slug)
  const user = author.byId(data.author)

  return {
    props: {
      user,
      data,
      mdxModule: content
    }
  }
}

export const getStaticPaths = () => {
  const posts = post.getList()
  const paths = Object
    .keys(posts)
    .map(slug => {
      return {
        params: {
          slug
        }
      }
    })

  return {
    paths,
    fallback: false
  }
}

export default Page