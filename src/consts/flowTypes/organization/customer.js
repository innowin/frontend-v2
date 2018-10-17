import type {fileType} from "../common/fileType";

export type CustomerType = {
  id: number,
  created_time: string,
  updated_time: string,
  delete_flag: boolean,
  title: string,
  customer_active: boolean,
  customer_organization: number,
  related_customer: number,
  customer_picture: fileType,
}

export type CustomerFormType = {
  title: string,
  customerActive: boolean,
  customerOrganization: number,
  relatedCustomer: number,
  customerPicture: fileType,
}
