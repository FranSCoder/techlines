import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetUpdateSuccess } from '../redux/actions/userActions';
import { useLocation, Navigate } from 'react-router-dom';
import { DateTime } from 'luxon';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();
  useEffect(() => {
    if (updateSuccess) {
      toast({ description: 'Perfil guardado correctamente.', status: 'success', isClosable: true });
      dispatch(resetUpdateSuccess());
    }
  }, [updateSuccess, toast]);

  return userInfo ? (
    <Formik
      initialValues={{ email: userInfo.email, password: '', name: userInfo.name, confirmPassword: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Introduzca un nombre.'),
        email: Yup.string().email('Email no válido.').required('Introduzca un email.'),
        password: Yup.string()
          .min(1, 'La contraseña es demasiado pequeña, mínimo 1 carácter.')
          .required('Introduzca una contraseña'),
        confirmPassword: Yup.string()
          .min(1, 'La contraseña es demasiado pequeña, mínimo 1 carácter.')
          .required('Introduzca una contraseña')
          .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir.'),
      })}
      onSubmit={(values) => {
        dispatch(updateProfile(userInfo._id, values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Box
          minH='100vh'
          maxW={{ base: '3xl', lg: '7xl' }}
          mx='auto'
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack spacing='10' direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
            <Stack flex='1.5' mb={{ base: '2xl', md: 'none' }}>
              <Heading fontSize='2xl' fontWeight='extrabold'>
                Profile
              </Heading>
              <Stack spacing='6'>
                <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                  {error && (
                    <Alert
                      status='error'
                      flexDirection='column'
                      alignItems='center'
                      justifyContent='center'
                      textAlign='center'
                    >
                      <AlertIcon />
                      <AlertTitle>Lo sentimos!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing='5'>
                    <FormControl>
                      <TextField type='text' name='name' placeholder='Tu nombre completo' label='Nombre completo' />
                      <TextField type='text' name='email' placeholder='tu@ejemplo.com' label='Email' />
                      <PasswordTextField
                        type='password'
                        name='password'
                        placeholder='Tu contraseña'
                        label='Contraseña'
                      />
                      <PasswordTextField
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirma tu contraseña'
                        label='Confirma tu contraseña'
                      />
                    </FormControl>
                  </Stack>
                  <Stack spacing='6'>
                    <Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
                      Guardar
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.800' }}>
              <Card>
                <CardHeader>
                  <Heading size='md'>Resumen de usuario</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    <Box pt='2' fontSize='sm'>
                      Registrado el{' '}
                      {DateTime.fromISO(userInfo.createdAt)
                        .setLocale('es')
                        .toLocaleString({ ...DateTime.DATE_MED, weekday: 'long' })}
                      .
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};
export default ProfileScreen;
