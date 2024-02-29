import { Heading, Box, Text, Stack, Button } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { Component } from 'react';
import Link from 'next/link';

 class DashboardOld extends Component {
  render() {
    return (
      <Layout>
        <Box minH={'90vh'} bg={'gray.50'}>
          <div className="section container">
            <div className="row gy-4">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <Box
                  w={'full'}
                  bg={'white'}
                  boxShadow={'lg'}
                  rounded={'md'}
                  overflow={'hidden'}
                >
                  <Box p={6} borderTop="4px" borderColor="teal">
                    <Stack spacing={2} mb={2} align={'center'}>
                      <Text fontSize={'sm'} color={'gray.500'}>
                        Total <span className="fw-bold">23</span> Students
                      </Text>

                      <Heading
                        fontSize={'xl'}
                        fontWeight={600}
                        fontFamily={'body'}
                        lineHeight={1.5}
                        align={'center'}
                      >
                        Operating System Lab{' '}
                        <Text
                          display={'inline'}
                          color={'gray.500'}
                          fontWeight={500}
                        >
                          (CSE 314)
                        </Text>
                      </Heading>

                      <Text color={'gray.500'}>50E (A+B)</Text>
                    </Stack>

                    <Stack mt={5} direction={'column'} spacing={2}>
                      <Link href="/teacher/class/rohxurl">
                        <Button
                          flex={1}
                          fontSize={'sm'}
                          py={3}
                          colorScheme="teal"
                          _focus={{
                            boxShadow: 'none',
                          }}
                        >
                          <a className="text-white">View Class</a>
                        </Button>
                      </Link>
                    </Stack>
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        </Box>
      </Layout>
    );
  }
}

export default DashboardOld;