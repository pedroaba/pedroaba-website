import { invalidatePageCache } from '@pedroaba/actions/utils/invalidate-page-cache'

type AsyncCallback = () => Promise<void>
type Callback = () => void

export async function invalidateCacheOnPages(
  path: string,
  callback?: AsyncCallback | Callback,
) {
  try {
    await invalidatePageCache(path)
  } finally {
    await callback?.()
  }
}
