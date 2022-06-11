import {ChangeEvent, memo, useState, VFC} from "react";
import React from 'react';
import {Box, Divider, Flex, Heading, Input, Stack} from "@chakra-ui/react";
import {PrimaryButton} from "../atoms/button/PrimaryButton";
import {useAuth} from "../../hooks/useAuth";

export const Login: VFC = memo(() => {
  const {login, loading} = useAuth();
  const [ usrId, setUsrId ] = useState('');

  const onClickLogin = () => login( usrId );

  const onChangeUsrId = (e: ChangeEvent<HTMLInputElement>) => setUsrId(e.target.value);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">ユーザー管理アプリ</Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input placeholder="ユーザーID" value={usrId} onChange={onChangeUsrId} />
          <PrimaryButton disabled={usrId === ''} onClick={onClickLogin} loading={loading}>ログイン</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
});
