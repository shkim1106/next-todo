"use client"

import React, { useState } from "react";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Input, Button, PopoverTrigger, Popover, PopoverContent, Spinner,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";
import { CustomModalType, FocusedTodoType, Todo } from "@/types"
import { useRouter } from "next/navigation";

import { VerticalDotsIcon } from "@/components/icons"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomModal from "./custom-modal";

const TodosTable = ({ todos }: { todos: Todo[] }) => {

    // 할일 추가 가능 여부
    const [todoAddEnable, setTodoAddEnable] = useState(false);

    // 입력된 할일
    const [newTodoInput, setNewTodoInput] = useState("")

    // 로딩 상태
    const [isLoading, setIsLoading] = useState<Boolean>(false)

    // 띄우는 모달 상태
    const [currentModalData, setCurrentModalData] = useState<FocusedTodoType>(
        {
            focusedTodo: null,
            modalType: "detail" as CustomModalType
        }
    )

    const router = useRouter();

    const notify = (msg: string) => toast.success(msg + " 추가 완료!");

    const addATodoHandler = async () => {
        if (!todoAddEnable) { return }

        setIsLoading(true)
        setNewTodoInput("")
        setTodoAddEnable(false)

        await new Promise(f => setTimeout(f, 600));

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
            method: 'post',
            body: JSON.stringify({
                title: newTodoInput
            }),
            cache: "no-store"
        });
        router.refresh();
        setIsLoading(false);
        notify(newTodoInput);
        console.log(`할일 추가완료 : ${newTodoInput}`)
    };

    const applyIsDoneUI = (isDone: boolean) => (isDone ? "line-through text-gray-900/50 dark:text-white/40" : "");

    const TodoRow = (aTodo: Todo) => {
        return <TableRow key={aTodo.id}>
            <TableCell className={applyIsDoneUI(aTodo.is_done)}>{aTodo.id.slice(0, 4)}</TableCell>
            <TableCell className={applyIsDoneUI(aTodo.is_done)}>{aTodo.title}</TableCell>
            <TableCell>{aTodo.is_done ? "✅" : "📌"}</TableCell>
            <TableCell className={applyIsDoneUI(aTodo.is_done)}>{`${aTodo.created_at}`}</TableCell> 
            <TableCell>
                <div className="relative flex justify-end items-center gap-2">
                    <Dropdown className="bg-background border-1 border-default-200">
                        <DropdownTrigger>
                            <Button isIconOnly radius="full" size="sm" variant="light">
                                <VerticalDotsIcon className="text-default-400" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu onAction={(key) => {
                            console.log(`aTodo.id : ${aTodo.id}, key: `, key)
                            setCurrentModalData({ focusedTodo: aTodo, modalType: key as CustomModalType })
                            onOpen();
                        }}>
                            <DropdownItem key="detail">상세보기</DropdownItem>
                            <DropdownItem key="edit">할일 수정</DropdownItem>
                            <DropdownItem key="delete">할일 삭제</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div></TableCell>
        </TableRow>
    }

    const DisabledTodoAddButton = () => {
        return <Popover placement="top" backdrop="blur">
            <PopoverTrigger>
                <Button className="h-13">추가</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <div className="text-small font-bold">경고⚠️</div>
                    <div className="text-tiny">할일을 입력하세요!</div>
                </div>
            </PopoverContent>
        </Popover>
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const ModalComponent = () => {
        return <div>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        (currentModalData.focusedTodo && <CustomModal
                            focusedTodo={currentModalData.focusedTodo}
                            modalType = { currentModalData.modalType }
                            onClose = { onClose }
                            />)
                    )}
                </ModalContent>
            </Modal>
        </div>
    }

    return (
        <div className="flex flex-col space-y-2">
            {ModalComponent()}
            <ToastContainer
                position="top-right"
                autoClose={1800}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="flex flex-wrap md:flex-nowrap gap-4">
                <Input type="text" label="새로운 할일"
                    value={newTodoInput}
                    onValueChange={(changedInput) => {
                        setNewTodoInput(changedInput);
                        setTodoAddEnable(changedInput.length > 0);
                    }}
                />
                {todoAddEnable ?
                    <Button color="warning" className="h-13"
                        onPress={async () => {
                            await addATodoHandler();
                        }}
                    >
                        추가
                    </Button> : DisabledTodoAddButton()
                }
            </div>

            <div className="h-6">{isLoading && <Spinner size="sm" color="warning" />}</div>

            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>아이디</TableColumn>
                    <TableColumn>할일내용</TableColumn>
                    <TableColumn>완료여부</TableColumn>
                    <TableColumn>생성일</TableColumn>
                    <TableColumn>액션</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"보여줄 데이터가 없습니다!"}>
                    {todos && todos.map((aTodo: Todo) => (
                        TodoRow(aTodo)
                    ))}
                </TableBody>
            </Table>
        </div>

    );
}

export default TodosTable;