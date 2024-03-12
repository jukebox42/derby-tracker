export default function Layout({
  children,
  forms,
}: {
  children: React.ReactNode
  forms: React.ReactNode
}) {
  return (
    <>
      {children}
      {forms}
    </>
  )
}