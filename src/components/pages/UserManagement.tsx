import {memo, useCallback, useEffect, VFC} from "react";
import React from 'react';
import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import {UserCard} from "../orgenisms/user/UserCard";
import {UserDetailModal} from "../orgenisms/user/UserDetailModal";
import {useAllUsers} from "../../hooks/useAllUsers";
import {useSelectUser} from "../../hooks/useSelectUser";
import {useLoginUser} from "../../hooks/useLoginUser";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();
  console.log(loginUser);

  useEffect(() => getUsers(), []);

  const onClickUser = useCallback((id: number) => {
    onSelectUser({ id, users, onOpen });
  }, [users, onSelectUser, onOpen]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{base: 4, md: 10}}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id = {user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}/>
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal isOpen={isOpen} onClose={onClose} isAdmin={loginUser?.isAdmin} user={selectedUser}/>
    </>
  );
});
