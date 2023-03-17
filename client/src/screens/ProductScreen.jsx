import { useParams } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Wrap,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
  Tooltip,
  Textarea,
  Input,
} from '@chakra-ui/react';
import { MinusIcon, StarIcon, SmallAddIcon } from '@chakra-ui/icons';
import { BiPackage, BiCheckShield, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { createProductReview, getProduct, resetProductError } from '../redux/actions/productActions';
import { addCartItem } from '../redux/actions/cartActions';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const ProductScreen = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState('');
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  let { id } = useParams();
  const toast = useToast();
  //redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product, reviewSend } = products;

  const cartContent = useSelector((state) => state.cart);
  const { cart } = cartContent;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    dispatch(getProduct(id));

    if (reviewSend) {
      toast({ description: 'Valoración registrada correctamente.', status: 'success', isClosable: true });
      dispatch(resetProductError());
      setReviewBoxOpen(false);
    }
  }, [dispatch, id, cart, reviewSend]);

  const changeAmount = (input) => {
    if (input === 'plus') {
      setAmount(amount + 1);
    }
    if (input === 'minus') {
      setAmount(amount - 1);
    }
  };

  const hasUserReviewed = () => product.reviews.some((item) => item.user === userInfo._id);

  const onSubmit = () => {
    dispatch(createProductReview(product._id, userInfo._id, comment, rating, title));
  };

  const addItem = () => {
    dispatch(addCartItem(product._id, amount));
    toast({ description: 'Artículo añadido.', status: 'success', isClosable: true });
  };

  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {loading ? (
        <Stack direction='row' spacing={4}>
          <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
        </Stack>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Lo sentimos!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box
            maxW={{ base: '3xl', lg: '5xl' }}
            mx='auto'
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
              <Stack
                pr={{ base: '0', md: '12' }}
                spacing={{ base: '8', md: '4' }}
                flex='1.5'
                mb={{ base: '12', md: 'none' }}
              >
                {product.productIsNew && (
                  <Badge rounded='full' w='52px' fontSize='0.8em' colorScheme='green'>
                    Nuevo
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge rounded='full' w='74px' fontSize='0.8em' colorScheme='red'>
                    Sin Stock
                  </Badge>
                )}
                <Heading fontSize='2xl' fontWeight='extrabold'>
                  {product.name}
                </Heading>
                <Stack spacing='5'>
                  <Box>
                    <Text fontSize='xl'>{product.price} €</Text>
                    <Flex>
                      <HStack spacing='2px'>
                        <StarIcon color='orange.500' />
                        <StarIcon color={product.rating >= 2 ? 'orange.500' : 'gray.200'} />
                        <StarIcon color={product.rating >= 3 ? 'orange.500' : 'gray.200'} />
                        <StarIcon color={product.rating >= 4 ? 'orange.500' : 'gray.200'} />
                        <StarIcon color={product.rating >= 5 ? 'orange.500' : 'gray.200'} />
                      </HStack>
                      <Text fontSize='medium' fontWeight='bold' ml='4px'>
                        {product.numberOfReviews} {product.numberOfReviews === 1 ? 'Valoración' : 'Valoraciones'}
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{product.description}</Text>
                  <Text fontWeight='bold'>Cantidad</Text>
                  <Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center'>
                    <Button isDisabled={amount <= 1} onClick={() => changeAmount('minus')}>
                      <MinusIcon />
                    </Button>
                    <Text mx='30px'>{amount}</Text>
                    <Button isDisabled={amount >= product.stock} onClick={() => changeAmount('plus')}>
                      <SmallAddIcon w='20px' h='25px' />
                    </Button>
                  </Flex>
                  <Button isDisabled={product.stock === 0} colorScheme='orange' onClick={() => addItem()}>
                    Añadir al carrito
                  </Button>
                  <Stack width='270px'>
                    <Flex alignItems='center'>
                      <BiPackage size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        Envío gratis al superar los 1000 €.
                      </Text>
                    </Flex>
                    <Flex alignItems='center'>
                      <BiCheckShield size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        Garantía de dos años.
                      </Text>
                    </Flex>
                    <Flex alignItems='center'>
                      <BiSupport size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        Estamos contigo 24/7.
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.800' }}>
                <Image mb='30px' src={product.image} alt={product.name} />
              </Flex>
            </Stack>
            {userInfo && (
              <>
                <Tooltip label={hasUserReviewed() ? 'Ya has valorado este artículo.' : ''} fontSize='md'>
                  <Button
                    isDisabled={hasUserReviewed()}
                    my='20px'
                    w='170px'
                    colorScheme='orange'
                    onClick={() => setReviewBoxOpen(!reviewBoxOpen)}
                  >
                    Valora este artículo
                  </Button>
                </Tooltip>
                {reviewBoxOpen && (
                  <Stack mb='20px'>
                    <Wrap>
                      <HStack spacing='2px'>
                        <Button variant='outline' onClick={() => setRating(1)}>
                          <StarIcon color='orange.500' />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(2)}>
                          <StarIcon color={rating >= 2 ? 'orange.500' : 'gray.200'} />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(3)}>
                          <StarIcon color={rating >= 3 ? 'orange.500' : 'gray.200'} />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(4)}>
                          <StarIcon color={rating >= 4 ? 'orange.500' : 'gray.200'} />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(5)}>
                          <StarIcon color={rating >= 5 ? 'orange.500' : 'gray.200'} />
                        </Button>
                      </HStack>
                    </Wrap>
                    <Input
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder='Título de la valoración (opcional)'
                    />
                    <Textarea
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      placeholder={`El/la ${product.name} es...`}
                    />
                    <Button w='170px' colorScheme='orange' onClick={() => onSubmit()}>
                      Publicar valoración
                    </Button>
                  </Stack>
                )}
              </>
            )}
            <Stack>
              <Text fontSize='xl' fontWeight='bold'>
                Valoraciones
              </Text>
              <SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
                {product.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing='2px' alignItems='center'>
                      <StarIcon color='orange.500' />
                      <StarIcon color={review.rating >= 2 ? 'orange.500' : 'gray.200'} />
                      <StarIcon color={review.rating >= 3 ? 'orange.500' : 'gray.200'} />
                      <StarIcon color={review.rating >= 4 ? 'orange.500' : 'gray.200'} />
                      <StarIcon color={review.rating >= 5 ? 'orange.500' : 'gray.200'} />
                      <Text fontWeight='semibold' ml='4px'>
                        {review.title && review.title}
                      </Text>
                    </Flex>
                    <Box py='12px'>{review.comment}</Box>
                    <Text fontSize='sm' color='gray.400'>
                      {`de ${review.name}, ${DateTime.fromISO(review.createdAt)
                        .setLocale('es')
                        .toLocaleString({ ...DateTime.DATE_MED, weekday: 'short' })}.`}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
};
export default ProductScreen;
