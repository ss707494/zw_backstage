import {User, UserListInput} from "@/common/graphqlTypes/types"
import {fpMergePre, fpSetPre} from "@/common/utils"
import {dealDealPageModel} from "@/component/Pagination"
import {getUserListDoc} from "@/common/graphqlTypes/graphql/doc"

export const listModel = dealDealPageModel('userListModel', {
  list: [] as User[],
  searchParams: {} as Pick<UserListInput, 'name'>,
}, {
  getList: async (value, option) => {
    const res = await option.query<UserListInput>(getUserListDoc, {
      name: option.data.searchParams.name,
      rows_per_page: option.data.rows_per_page,
      page: option.data.page,
    })
    console.log(res)
    option.setData(fpSetPre('list', res?.userList))

  },
  setSearchParams: (value: UserListInput, option) => option.setData(fpMergePre({searchParams: value})),

})
