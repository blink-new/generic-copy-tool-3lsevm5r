import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
}

interface CartModalProps {
  open: boolean
  onClose: () => void
  cartItems: CartItem[]
  subtotal: number
  total: number
  removeFromCart: (index: number) => void
}

export function CartModal({ open, onClose, cartItems, subtotal, total, removeFromCart }: CartModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-slate-900 border-2 border-red-500 text-white">
        <div className="flex justify-between items-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-500">Your Cart</DialogTitle>
          </DialogHeader>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-white hover:bg-red-500/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {cartItems.length === 0 ? (
          <div className="mt-4 text-center text-gray-400">Your cart is empty.</div>
        ) : (
          <ul className="mt-4 space-y-4">
            {cartItems.map((item, index) => (
              <li key={item.id} className="flex items-center justify-between">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
        <hr className="my-4 border-gray-700" />
        <div className="flex justify-between font-semibold text-white">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-red-500 text-lg mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Button 
          disabled={cartItems.length === 0}
          className="w-full bg-red-500 mt-6 text-white font-semibold py-3"
        >
          Checkout
        </Button>
      </DialogContent>
    </Dialog>
  )
}
