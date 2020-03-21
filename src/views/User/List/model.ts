import {User, UserListInput} from "@/common/graphqlTypes/types"
import {fpMergePre} from "@/common/utils"
import {dealDealPageModel} from "@/component/Pagination"
import {getUserListDoc, saveUserListDoc} from "@/common/graphqlTypes/graphql/doc"

export const listModel = dealDealPageModel('userListModel', {
  list: [] as User[],
  total: 0 as number,
  searchParams: {} as Omit<UserListInput, 'rows_per_page' | 'page'>,
  actionUserLevel: '',
  selectIds: [] as string[],
}, {
  getList: async (value, option) => {
    const res = await option.query<UserListInput>(getUserListDoc, {
      ...option.data.searchParams,
      rows_per_page: option.data.rows_per_page,
      page: option.data.page,
    })
    option.setData(fpMergePre(res?.userList))
  },
  setSearchParams: (value: UserListInput, option) => option.setData(fpMergePre({searchParams: value})),
  setActionUserLevel: (value: string, {setData}) => setData(fpMergePre({
    actionUserLevel: value,
  })),
  setSelectIds: (value: { flag: boolean, ids: string[] }, {data, setData}) => {
    const {flag, ids} = value
    if (flag) {
      setData(fpMergePre({
        selectIds: [
            ...data.selectIds.filter(value1 => !ids.includes(value1)),
            ...ids,
        ],
      }))
    } else {
      setData(fpMergePre({
        selectIds: data.selectIds.filter(value1 => !ids.includes(value1)),
      }))
    }
  },
  async saveUserLevel(value, option) {
    const res = await option.mutate(saveUserListDoc, option.data.selectIds.map(value1 => ({
      id: value1,
      userInfo: {
        userLevel: option.data.actionUserLevel,
      },
    })))
    console.log(res)
    return res
  },
})
