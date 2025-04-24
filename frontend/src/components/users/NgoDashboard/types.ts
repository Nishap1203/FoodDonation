export interface DonationRequest {
  id: string
  donorName: string
  foodType: string
  quantity: number
  servings: number
  requestDate: string
  status: "pending" | "approved" | "rejected"
  location: string
}
export interface DonationStats {
  totalRequests: number
  approvedRequests: number
  rejectedRequests: number
  pendingRequests: number
  totalServings: number
  monthlyDonations: {
    month: string
    amount: number
  }[]
  requestStatus: {
    status: string
    count: number
  }[]
}