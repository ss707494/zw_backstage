import {User, UserListInput} from "@/common/graphqlTypes/types"
import {fpMergePre, fpSetPre} from "@/common/utils"
import {pageModel} from "@/component/Pagination"
import {getUserListDoc, saveUserListDoc} from "@/common/graphqlTypes/graphql/doc"
import {mergeModel, mergeTwoModel} from '@/common/ModelAction/modelUtil'
import {listSelectModel} from '@/common/model/listSelect'

const initSearch = {
  name: '',
  registerName: '',
  phone: '',
  email: '',
} as Omit<UserListInput, 'rows_per_page' | 'page'>

export const listModel = mergeModel(mergeTwoModel(listSelectModel, pageModel), 'userListModel', {
  list: [] as User[],
  total: 0 as number,
  searchParams: initSearch as Omit<UserListInput, 'rows_per_page' | 'page'>,
  actionUserLevel: '',
}, {
  getList: async (value, option) => {
    const res = await option.query<UserListInput>(getUserListDoc, {
      ...option.data.searchParams,
      rows_per_page: option.data.rows_per_page,
      page: option.data.page,
    })
    option.setData(fpMergePre(res?.userList))
  },
  clearSearch: (value, option) => option.setData(fpSetPre('searchParams', initSearch)),
  setSearchParams: (value: UserListInput, option) => option.setData(fpMergePre({searchParams: value})),
  setActionUserLevel: (value: string, {setData}) => setData(fpMergePre({
    actionUserLevel: value,
  })),
  async saveUserLevel(value, option) {
    return await option.mutate(saveUserListDoc, option.data.selectItems.map(value1 => ({
      id: value1,
      userInfo: {
        userLevel: option.data.actionUserLevel,
      },
    })))
  },
})
