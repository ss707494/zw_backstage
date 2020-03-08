import {mergeModel} from "@/common/ModelAction/modelUtil"
import {pageModel} from "@/component/Pagination"

export const orderListModel = mergeModel(pageModel, 'orderList', {}, {})
