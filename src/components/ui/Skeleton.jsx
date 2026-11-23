import { cx } from '@/lib/format'

export const Skeleton = ({ className }) => (
  <div aria-hidden className={cx('animate-skeleton rounded-sm bg-stone motion-reduce:animate-none', className)} />
)
