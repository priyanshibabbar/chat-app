// import React from "react";
// import { Button } from "@chakra-ui/button";
// import {
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   InputRightElement,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const Signup = () => {
//   const [show, setShow] = useState(false);
//   const [name, setName] = useState();
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [confirmpassword, setConfirmpassword] = useState();

//   const [pic, setPic] = useState();
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();
//   const history = useHistory();

//   const handleClick = () => setShow(!show);

//   const postDetails = (pic) => {
//     setLoading(true);
//     if (pic === undefined) {
//       toast({
//         title: "Please Select an Image!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       return;
//     }

//     if (pic.type === "image/jpeg" || pic.type === "image/png") {
//       const data = new FormData();
//       data.append("file", pic);
//       data.append("upload-preset", "study-sphere");
//       data.append("cloud_name", "dzju40t2n");
//       fetch("https://api.cloudinary.com/v1_1/dzju40t2n", {
//         method: "post",
//         body: data,
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setPic(data.url.toString());
//           console.log(data.url.toString());
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.log("Here it is!", err);
//           setLoading(false);
//         });
//     } else {
//       toast({
//         title: "Please Select an Image!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }
//   };

//   const submitHandler = async () => {
//     setLoading(true);
//     if (!name || !email || !password || !confirmpassword) {
//       toast({
//         title: "Please fill all the details!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }

//     if (password !== confirmpassword) {
//       toast({
//         title: "Passwords do not match!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         "/api/user",
//         { name, email, password, pic },
//         config
//       );

//       toast({
//         title: "Registration Successful!",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });

//       localStorage.setItem("userInfo", JSON.stringify(data));

//       setLoading(false);
//       history.pushState('/chats')
      
//     } catch (error) {
//       toast({
//         title: "Error Occured",
//         description: error.response.data.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });

//       setLoading(false);
//     }
//   };

//   return (
//     <VStack spacing={"5px"}>
//       <FormControl id="first-name" isRequired>
//         <FormLabel>Name</FormLabel>
//         <Input
//           placeholder="Enter Your Name"
//           onChange={(e) => setName(e.target.value)}
//         />
//       </FormControl>

//       <FormControl id="email" isRequired>
//         <FormLabel>Email</FormLabel>
//         <Input
//           placeholder="Enter Your Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>

//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup>
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Enter Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <InputRightElement width={"4.5rem"}>
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>

//       <FormControl id="password" isRequired>
//         <FormLabel>Confirm Password</FormLabel>
//         <InputGroup>
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Confirm Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <InputRightElement width={"4.5rem"}>
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>

//       <FormControl>
//         <FormLabel>Upload Your Picture</FormLabel>
//         <Input
//           type="file"
//           p={1.5}
//           accept="image/*"
//           onChange={(e) => postDetails(e.target.files[0])}
//         />
//       </FormControl>

//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         isLoading={loading}
//       >
//         Sign Up
//       </Button>
//     </VStack>
//   );
// };

// export default Signup;




import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [pic, setPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setShow(!show);

  const postDetails = (selectedPic) => {
    if (selectedPic) {
      setPic(selectedPic);
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill in all the details!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("pic", pic);

      const { data } = await axios.post("http://localhost:4000/api/user/signup", formData);

      toast({
        title: "Registration Successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response.data.message,
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
