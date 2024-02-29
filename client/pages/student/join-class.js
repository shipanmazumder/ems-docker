import {Flex, Stack, Text, Input, Button} from '@chakra-ui/react';
import Layout from '@/components/Layout';
import {Component, useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import {joinClass} from '../../store/actions/classAction'

function JoinClass(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [classInfo, setClassInfo] = useState({
        classCode: "",
    });
    const [message, setMessage] = useState("");
    useEffect(() => {
        if (!props.auth.isStudent) router.push("/student/login");
        setMessage(props.classes.message);
    }, [props.classes]);
    const submitHandler = async (e) => {
        e.preventDefault();
        await props.joinClass(classInfo, router);
    };
    const changeHandler = (e) => {
        setClassInfo({...classInfo, [e.target.name]: e.target.value});
    };
    return (
        <Layout metaTitle={'Join Class'}>
            <Flex
                minH={'90vh'}
                align={'center'}
                justify={'center'}
                py={12}
                bg={'gray.50'}
            >
                <form onSubmit={submitHandler}>
                    <Stack
                        boxShadow={'2xl'}
                        bg={'white'}
                        rounded={'xl'}
                        p={10}
                        spacing={8}
                        align={'center'}
                    >

                        <Stack align={'center'} spacing={2}>
                            <Text fontSize={'xl'} color={'gray.500'} align={'center'}>
                                Enter Class Code to <br/> Join New Class
                                <strong className="d-block mb-2 text-danger">{message}</strong>
                            </Text>
                        </Stack>
                        <Stack spacing={4} w={'full'}>
                            <Input
                                type={'text'}
                                placeholder={'ex: 12345'}
                                color={'gray.800'}
                                bg={'gray.100'}
                                rounded={'lg'}
                                border={0}
                                name={"classCode"}
                                onChange={changeHandler}
                                _focus={{
                                    bg: 'gray.200',
                                    outline: 'none',
                                }}
                            />
                            <Button
                                type="submit"
                                bg={'teal.400'}
                                rounded={'lg'}
                                color={'white'}
                                flex={'1 0 auto'}
                                _hover={{bg: 'teal.500'}}
                                _focus={{bg: 'teal.500'}}
                            >
                                Join Class
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Flex>
        </Layout>
    );
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        classes: state.classes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        joinClass: (classInfo, router) => dispatch(joinClass(classInfo, router)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinClass);