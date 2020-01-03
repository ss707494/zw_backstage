import React from "react";
import {S} from './style';
import {CusButton} from "@/component/CusButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import {StyleLoading} from "@/common/style/loading";
import TableHead from "@material-ui/core/TableHead";
import {TableRow} from "@material-ui/core";
import {CusTableCell as TableCell} from "@/component/CusTableCell";
import TableBody from "@material-ui/core/TableBody";
import {StyleTableBox} from "@/common/style/tableBox";

interface DictType {
    name: string,
    code: string,
}

interface DictItem {
    id: string,
    name: string,
    code: string,
}
const buildDictItem = (name:string, code: string): DictItem => {
    return {
        name,
        code,
        id: code,
    }
}

const dictTypes: DictType[] = [
    {name: '上架类型', code: '133'},
    {name: '重量单位', code: '233'},
    {name: '重量单位', code: '333'},
    {name: '拆包单位', code: '433'},
]

export const Dictionary = ({theme}: { theme: any }) => {
    const [activeCode, setActiveCode] = React.useState(dictTypes[0].code)
    const changeActiveCode = (activeCode: string) => () => {
        setActiveCode(activeCode)
    }
    const listLoad = false
    let listData: DictItem[] = [
        buildDictItem('字典1', '1'),
        buildDictItem('字典2', '2'),
    ]
    return (
        <S.Box>
            <S.LeftBox>
                {dictTypes?.map(e =>
                    e.code === activeCode ?
                        <S.ActiveBox>
                            {e.name}
                        </S.ActiveBox>
                        : <S.LeftCard
                            onClick={changeActiveCode(e.code)}
                        >
                            {e.name}
                        </S.LeftCard>
                )}
            </S.LeftBox>
            <S.RightBox>
                <header>
                    <CusButton
                        variant="contained"
                        color="primary"
                    >
                        新增
                    </CusButton>
                </header>
                <main>
                    {(listLoad) ? <StyleLoading><CircularProgress/></StyleLoading>
                        : <StyleTableBox.Table theme={theme}>
                            <TableHead>
                                <TableRow>
                                    {['名称', 'code']
                                        .map(e => <TableCell key={`TableHead${e}`}>
                                            {e}
                                        </TableCell>)
                                    }
                                    <TableCell width={150}>
                                        操作
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listData?.map(e => <TableRow key={`TableBody${e?.id}`}>
                                    <TableCell>{e?.name}</TableCell>
                                    <TableCell>{e?.code}</TableCell>
                                    <TableCell>
                                        <StyleTableBox.ActionTableCell>
                                            <CusButton
                                                color="secondary"
                                                onClick={() => {
                                                }}
                                                variant="contained"
                                            >编辑</CusButton>
                                            <CusButton
                                                color="default"
                                                onClick={() => {
                                                }}
                                                variant="contained"
                                            >详情</CusButton>
                                        </StyleTableBox.ActionTableCell>
                                    </TableCell>
                                </TableRow>)}
                            </TableBody>
                        </StyleTableBox.Table>
                    }
                </main>
            </S.RightBox>
        </S.Box>
    );
}

export default Dictionary

