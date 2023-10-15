import React from 'react';
import { Button } from "@chakra-ui/button"
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react"
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import {useNavigate} from "react-router-dom";

const Login = () => {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  // const navigate = useNavigate();
  const handleClick = () => setShow(!show);

  // const submitHandler = async() => {
  //   setLoading(true);
  //   if(!email || !password) {
  //     toast({
  //       title: "Please Fill all the fields",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const config = {
  //       headers : {
  //         'Content-Type': `application/json`,
  //       },
  //     };
  //     const {data} = await axios.post(
  //         "http://localhost:4000/api/user/login",
  //       { email, password },
  //       config
  //     );

  //     console.log("this is data-->" ,data)

  //     localStorage.setItem("userInfo", JSON.stringify(data))
  //     setLoading(false);

  //     history.pushState('/chats')
      
      
  //   } catch (error) {
  //     toast({
  //       title: "Error Occured",
  //       description: error.response.data?.message,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });

  //     setLoading(false);
  //   }
  // }
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        { email, password },
        config
      );

      console.log("this is res -->" , response);
  
      if (response && response.data) {
        const { data } = response;
        console.log("this is data-->", data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history.push('/chats'); // Use `history.push` directly, not `history.pushState`
      } else {
        // Handle the case where `data` is undefined or doesn't exist in the response.
        toast({
          title: "Error Occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response?.data.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  
  return (
    <VStack spacing={"5px"}>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
        value={email}
          placeholder='Enter Your Email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input 
            type={show ? "text" : 'password'}
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button 
        colorScheme='blue'
        width="100%"
        style={{marginTop : 15}}
        onClick={submitHandler}
        isLoading={loading}
        >
          Login
        </Button>

        <Button
          varient = "solid"
          colorScheme='red'
          width={"100%"}
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Get Guest User Credentials
        </Button>
    </VStack>
  )
}

export default Login