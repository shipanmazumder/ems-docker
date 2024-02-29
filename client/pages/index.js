import Layout from "@/components/Layout";
import { Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="container mt-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6">
            <Stack spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }}>
              <Heading
                fontWeight={600}
                fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
              >
                Online Exam <br />
                <Text as={"span"} color={"teal.400"}>
                  Made Easy
                </Text>
              </Heading>
              <Text color={"gray.500"} maxW={"3xl"}>
                EMS is a cost-effective, scalable way to convert traditional pen
                and paper-based exams to online and paperless mode.
              </Text>
              <Stack spacing={4} direction={"row"}>
                <Link
                  href="/teacher/login"
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Button colorScheme="teal" size="lg" fontSize="sm">
                    I'm a Teacher
                  </Button>
                </Link>
                <Link
                  href="/student/login"
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Button
                    colorScheme="teal"
                    size="lg"
                    fontSize="sm"
                    variant="outline"
                  >
                    I'm a Student
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </div>

          <div className="col-lg-5 text-center">
            <Image
              alt={"banner Image"}
              objectFit={"cover"}
              src={"images/banner.svg"}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
