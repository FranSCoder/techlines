import {
  Box,
  Th,
  Tr,
  Table,
  Thead,
  Tbody,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, resetProductError } from '../redux/actions/productActions';
import ProductTableItem from './ProductTableItem';
import AddNewProduct from './AddNewProduct';

const ProductsTab = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading } = admin;
  const productInfo = useSelector((state) => state.products);
  const { products, productUpdate } = productInfo;
  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());
    if (productUpdate) {
      toast({ description: 'El producto ha sido actualizado.', status: 'success', isClosable: true });
    }
  }, [dispatch, toast, productUpdate]);

  return (
    <Box>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify='center'>
          <Stack direction='row' spacing='4'>
            <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='right'>
                    <Box>
                      <Text mr='8px' fontWeight='bold'>
                        Añadir un producto
                      </Text>
                    </Box>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb='4'>
                <Table>
                  <Tbody>
                    <AddNewProduct />
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Table variant='simple' size='lg'>
            <Thead>
              <Tr>
                <Th>Imagen</Th>
                <Th>Descripción</Th>
                <Th>Marca y nombre</Th>
                <Th>Categoría y precio</Th>
                <Th>Stock y novedad</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.length > 0 &&
                products.map((product) => <ProductTableItem key={product._id} product={product} />)}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};
export default ProductsTab;
