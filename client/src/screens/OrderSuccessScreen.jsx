import { Button, Alert, AlertDescription, AlertTitle, AlertIcon, Wrap, useToast, Stack } from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';

const OrderSuccessScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: 'Has cerrado sesión.', status: 'success', isClosable: true });
    navigate('/products');
  };
  return (
    <Wrap justify='center' direction='column' align='center' mt='20px' minH='100vh'>
      <Alert
        status='success'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='auto'
      >
        <AlertIcon boxSize='55px' />
        <AlertTitle py='8px' fontSize='xl'>
          ¡Pago realizado con éxito!
        </AlertTitle>
        <AlertDescription>¿A dónde quieres ir ahora?</AlertDescription>
        <Stack mt='20px' minW='200px'>
          <Button colorScheme='teal' variant='outline' as={ReactLink} to='/your-orders'>
            Tus pedidos
          </Button>
          <Button colorScheme='teal' variant='outline' as={ReactLink} to='/products'>
            Productos
          </Button>
          <Button colorScheme='teal' variant='outline' onClick={logoutHandler}>
            Cerrar sesión
          </Button>
        </Stack>
      </Alert>
    </Wrap>
  );
};
export default OrderSuccessScreen;
