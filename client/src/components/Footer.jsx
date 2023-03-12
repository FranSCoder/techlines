import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Box,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { GiTechnoHeart } from 'react-icons/gi';

const Footer = () => (
  <Box w='100%' bg={useColorModeValue('gray.100', 'gray.900')}>
    <Container as='footer' role='contentinfo' maxW='7xl'>
      <Stack
        spacing='8'
        direction={{ base: 'column', md: 'row' }}
        justify='space-between'
        py={{ base: '12', md: '16' }}
      >
        <Stack spacing={{ base: '6', md: '8' }} align='start'>
          <Flex alignItems='center'>
            <Icon as={GiTechnoHeart} h={10} w={10} color='orange.400' />
            <Text fontSize='2xl' fontWeight='extrabold'>
              Tech Lines
            </Text>
          </Flex>
          <Text color='muted'>Amamos la tecnología.</Text>
        </Stack>
        <Stack direction={{ base: 'column-reverse', md: 'column', lg: 'row' }} spacing={{ base: '12', md: '8' }}>
          <Stack direction='row' spacing='8'>
            <Stack spacing='4' minW='36' flex='1'>
              <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                Nosotros
              </Text>
              <Stack spacing='3' shouldWrapChildren>
                <Button variant='link'>Nuestra filosofía</Button>
                <Button variant='link'>Precios</Button>
              </Stack>
            </Stack>
            <Stack spacing='4' minW='36' flex='1'>
              <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                Legal
              </Text>
              <Stack spacing='3' shouldWrapChildren>
                <Button variant='link'>Privacidad</Button>
                <Button variant='link'>Términos y Condiciones</Button>
                <Button variant='link'>Licencia</Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing='4'>
            <Text fontSize='sm' fontWeight='semibold' color='subtle'>
              Mantente actualizado
            </Text>
            <Stack spacing='4' direction={{ base: 'column', sm: 'row' }} maxW={{ lg: '360px' }}>
              <Input placeholder='Introduce tu email' type='email' required />
              <Button variant='primary' type='submit' flexShrink={0}>
                Suscríbete
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack pt='8' pb='12' justify='space-between' direction={{ base: 'column-reverse', md: 'row' }} align='center'>
        <Text fontSize='sm' color='subtle'>
          &copy; {new Date().getFullYear()} Tech Lines, SA. Todos los derechos reservados.
        </Text>
        <ButtonGroup variant='ghost'>
          <IconButton as='a' href='#' aria-label='LinkedIn' icon={<FaLinkedin fontSize='1.25rem' />} />
          <IconButton as='a' href='#' aria-label='GitHub' icon={<FaGithub fontSize='1.25rem' />} />
          <IconButton as='a' href='#' aria-label='Twitter' icon={<FaTwitter fontSize='1.25rem' />} />
        </ButtonGroup>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
