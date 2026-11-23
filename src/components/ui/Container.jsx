import { cx } from '@/lib/format'

export const Container = ({ as: Tag = 'div', className, children, ...props }) => (
  <Tag className={cx('mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-12', className)} {...props}>
    {children}
  </Tag>
)
