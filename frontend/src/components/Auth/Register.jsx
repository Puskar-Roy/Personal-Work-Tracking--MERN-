
import { Link } from 'react-router-dom'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';
import {Toaster , toast} from 'react-hot-toast';

export default function Regsiter() {
  const [showPassword, setShowPassword] = useState(false);
    const [form, setform] = useState({
      email: "",
      password: "",
      phone:"",
      password:"",
      cpassword:"",
      
    });

    const handleInputChangeLogin = (event) => {
      const { name, value } = event.target;
      setform({
        ...form,
        [name]: value,
      });
    };

    const handelLogin =async () => {
      console.log(form);
      try {
        await axios.post("http://localhost:8000/api/register",form,{
          withCredentials:true
        });
        toast.success("Log In Done!")
      } catch (error) {
        toast.error("Log Fail!");
        console.log(error);
      }
    };


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Toaster/>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={handleInputChangeLogin}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="number"
                    name="phone"
                    id="phone"
                    value={form.phone}
                    onChange={handleInputChangeLogin}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleInputChangeLogin}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleInputChangeLogin}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>{
                      setShowPassword((showPassword) => !showPassword)}
                    }
                  >
                    {showPassword ? <Text>Hide</Text> : <Text>Show</Text>}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="cpassword"
                  id="cpassword"
                  value={form.cpassword}
                  onChange={handleInputChangeLogin}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>{
                      setShowPassword((showPassword) => !showPassword)}
                    }
                  >
                    {showPassword ? <Text>Hide</Text> : <Text>Show</Text>}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handelLogin}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to="/" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
