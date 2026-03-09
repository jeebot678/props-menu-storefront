"use server"
import { cookies as nextCookies } from "next/headers"
import { redirect } from "next/navigation"

export async function resetOnboardingState(orderId: string) {
  const cookies = await nextCookies()
  cookies.set("_medusa_onboarding", "false", { maxAge: -1 })

  const adminUrl = process.env.NEXT_PUBLIC_MEDUSA_ADMIN_URL

  if (adminUrl) {
    redirect(`${adminUrl.replace(/\/$/, "")}/a/orders/${orderId}`)
  }

  redirect(`/order/${orderId}/confirmed`)
}
