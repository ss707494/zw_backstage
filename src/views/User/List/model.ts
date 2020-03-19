import {User, UserListInput} from "@/common/graphqlTypes/types"
import {fpMergePre} from "@/common/utils"
import {dealDealPageModel} from "@/component/Pagination"
import {getUserListDoc} from "@/common/graphqlTypes/graphql/doc"

export const listModel = dealDealPageModel('userListModel', {
  list: [] as User[],
  total: 0 as number,
  searchParams: {} as Omit<UserListInput, 'rows_per_page' | 'page'>,
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

})
