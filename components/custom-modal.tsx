"use client"

import React, { useState } from "react";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Input, Button, PopoverTrigger, Popover, PopoverContent, Spinner,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Switch
} from "@nextui-org/react";
import { CustomModalType, FocusedTodoType, Todo } from "@/types"
import { useRouter } from "next/navigation";

import { VerticalDotsIcon } from "@/components/icons"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CustomModal = ({ focusedTodo, modalType, onClose }:
    {
        focusedTodo: Todo,
        modalType: CustomModalType,
        onClose: () => void
    }) => {


    // 수정된 선택
    const [isDone, setIsDone] = useState<boolean>(focusedTodo.is_done);

    // 로딩 상태
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 수정된 할일 입력
    const [editedTodoInput, setEditedTodoInput] = useState<string>(focusedTodo.title);

    // setEditedTodoInput(focusedTodo.title)
    // setIsDone(focusedTodo.is_done)

    const router = useRouter();

    const notifyDeleted = (msg: string) => toast.success("\"" + msg + "\"" + " 삭제 완료!");
    const notifyEdited = () => toast.success("수정 완료!");

    const deleteATodoHandler = async () => {
        setIsLoading(true);
        await new Promise(f => setTimeout(f, 600));
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${focusedTodo.id}`, {
            method: 'delete',
            cache: "no-store"
        });
        router.refresh();
        setIsLoading(false);
        notifyDeleted(focusedTodo.title);
        console.log(`할일 삭제완료 : ${focusedTodo}`)
    };

    const editATodoHandler = async () => {
        setIsLoading(true);
        await new Promise(f => setTimeout(f, 600));
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${focusedTodo.id}`, {
            method: 'post',
            body: JSON.stringify({
                title: editedTodoInput,
                is_done: isDone
            }),
            cache: "no-store"
        });
        setIsLoading(false);
        router.refresh();
        notifyEdited();
        console.log(`할일 수정완료 : ${focusedTodo}`)
    };

    const DetailModal = () => {
        return <>
            <ModalHeader className="flex flex-col gap-1">상세보기</ModalHeader>
            <ModalBody>
                <div className="flex py-2 space-x-4">
                    <span className="font-bold">id: </span>
                    <p>{focusedTodo.id}</p>
                </div>
                <div className="flex py-2 space-x-4">
                    <span className="font-bold">할일: </span>
                    <p>{focusedTodo.title}</p>
                </div>
                <div className="flex py-2 space-x-4">
                    <span className="font-bold">완료여부: </span>
                    <p>{focusedTodo.is_done ? "완료" : "진행중"}</p>
                </div>
                <div className="flex py-2 space-x-4">
                    <span className="font-bold">작성일: </span>
                    <p>{`${focusedTodo.created_at}`}</p>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                    닫기
                </Button>
                <Button color="warning" onPress={onClose}>
                    완료
                </Button>
            </ModalFooter>
        </>
    }

    const EditModal = () => {
        return <>
            <ModalHeader className="flex flex-col gap-1">할일 수정</ModalHeader>
            <ModalBody>
                <div className="flex py-2 space-x-4">
                    <span className="font-bold">id: </span>
                    <p>{focusedTodo.id}</p>
                </div>
                <Input
                    isRequired
                    autoFocus
                    label="할일 내용"
                    placeholder="할일을 입력해주세요"
                    variant="bordered"
                    defaultValue={focusedTodo.title}
                    value={editedTodoInput}
                    onValueChange={setEditedTodoInput}
                />
                <div className="flex py-2 space-x-4">
                    <span className="font-bold">완료여부: </span>
                    <Switch defaultSelected={focusedTodo.is_done}
                        onValueChange={setIsDone}
                        aria-label="Automatic updates"
                        color="warning">
                    </Switch>
                </div>
                <div className="flex py-2 space-x-4">
                    <span className="font-bold">작성일: </span>
                    <p>{`${focusedTodo.created_at}`}</p>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                    닫기
                </Button>
                <Button color="warning" onPress={async () => {
                    await editATodoHandler();
                    onClose();
                }}>
                    {(isLoading) ? <Spinner size="sm" color="default" /> : "수정"}
                </Button>
            </ModalFooter>
        </>
    }

    const DeleteModal = () => {
        return <>
            <ModalHeader className="flex flex-col gap-1">할일 삭제</ModalHeader>
            <ModalBody>
                <div className="flex py-2 space-x-4">
                    <span className="font-bold">id: </span>
                    <p>{focusedTodo.id}</p>
                </div>
                <div className="flex py-2 space-x-4">
                    <span className="font-bold">할일: </span>
                    <p>{focusedTodo.title}</p>
                </div>
                <div className="flex py-2 space-x-4">
                    <span className="font-bold">완료여부: </span>
                    <p>{focusedTodo.is_done ? "완료" : "진행중"}</p>
                </div>
                <div className="flex py-2 space-x-4">
                    <span className="font-bold">작성일: </span>
                    <p>{`${focusedTodo.created_at}`}</p>
                </div>
                <span className="font-extrabold ">삭제하시겠습니까?</span>
            </ModalBody>
            <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                    취소
                </Button>
                <Button color="danger" onPress={async () => {
                    await deleteATodoHandler();
                    onClose();
                }}>
                    {(isLoading) ? <Spinner size="sm" color="default" /> : "삭제"}
                </Button>
            </ModalFooter>
        </>
    }

    const getModal = (type: CustomModalType) => {
        switch (type) {
            case "detail":
                return DetailModal();
            case "edit":
                return EditModal();
            case "delete":
                return DeleteModal();
            default: break;

        }
    }

    return (
        <>
            {getModal(modalType)}
        </>
    )

}

export default CustomModal;