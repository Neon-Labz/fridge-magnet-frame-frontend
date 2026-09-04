"use client";

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import type { ChangeEvent } from 'react';

type CartItemProps = {
  id: string;
  name: string;
  subtitle?: string;
  qty: number;
  price: number;
  image?: string;
  onChangeQty: (id: string, qty: number) => void;
  onDelete: (id: string) => void;
};

export default function CartItem({ id, name, subtitle, qty, price, image, onChangeQty, onDelete }: CartItemProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value || '0', 10);
    if (!Number.isNaN(v)) onChangeQty(id, Math.max(0, v));
  };

  return (
    <article style={{ position: 'relative', boxSizing: 'border-box', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '24px', gap: '24px', width: '794.67px', height: '210px', background: '#FFFFFF', border: '1px solid #C3C6D4', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', borderRadius: '12px', flex: 'none', order: 0, alignSelf: 'stretch', flexGrow: 0 }}>
      <button
        type="button"
        onClick={() => onDelete(id)}
        style={{ position: 'absolute', top: '20px', right: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 0, width: '16px', height: '18px', flex: 'none', order: 1, flexGrow: 0, background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Delete item"
      >
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', padding: 0, width: '16px', height: '18px', flex: 'none', order: 0, flexGrow: 0 }}>
          <Trash2 style={{ width: '16px', height: '18px', color: '#747784' }} strokeWidth={2} />
        </div>
      </button>

      <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: 0, width: '160px', height: '160px', background: '#F3F3F8', border: '1px solid #EDEDF2', borderRadius: '8px', flex: 'none', order: 0, flexGrow: 0 }}>
        <Image
          src={image || 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22158%22 height=%22158%22><rect width=%22158%22 height=%22158%22 fill=%22%23e5e7eb%22 /></svg>'}
          alt={name}
          width={158}
          height={158}
          style={{ width: '158px', height: '158px' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', padding: 0, gap: '32px', width: '560.67px', height: '160px', flex: 'none', order: 1, alignSelf: 'stretch', flexGrow: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 0, width: '560.67px', height: '56px', flex: 'none', order: 0, alignSelf: 'stretch', flexGrow: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '4px', width: '235.41px', height: '56px', flex: 'none', order: 0, flexGrow: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, width: '235.41px', height: '32px', flex: 'none', order: 0, alignSelf: 'stretch', flexGrow: 0 }}>
              <h3 style={{ width: '235.41px', height: '32px', fontFamily: 'Manrope', fontStyle: 'normal', fontWeight: 600, fontSize: '24px', lineHeight: '32px', letterSpacing: '0px', verticalAlign: 'middle', display: 'flex', alignItems: 'center', color: '#002B73', flex: 'none', order: 0, flexGrow: 0, margin: 0 }}>
                {name}
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, width: '235.41px', height: '20px', flex: 'none', order: 1, alignSelf: 'stretch', flexGrow: 0 }}>
              {subtitle ? (
                <p style={{ width: '115.2px', height: '20px', fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 600, fontSize: '14px', lineHeight: '20px', display: 'flex', alignItems: 'center', color: '#747784', flex: 'none', order: 0, flexGrow: 0, margin: 0 }}>
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 0, gap: '323.17px', width: '560.67px', height: '34px', flex: 'none', order: 1, alignSelf: 'stretch', flexGrow: 0 }}>
            <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0, width: '126.49px', height: '34px', border: '1px solid #C3C6D4', borderRadius: '8px', flex: 'none', order: 0, flexGrow: 0 }}>
              <button
                onClick={() => onChangeQty(id, Math.max(0, qty - 1))}
                style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4px 12px', width: '32.45px', height: '32px', borderRight: '1px solid #C3C6D4', flex: 'none', order: 0, flexGrow: 0, background: 'none', cursor: 'pointer' }}
              >
                <span style={{ width: '7.45px', height: '24px', fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 700, fontSize: '16px', lineHeight: '24px', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#002B73', flex: 'none', order: 0, flexGrow: 0 }}>-</span>
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 0, width: '56.27px', height: '28px', flex: 'none', order: 1, flexGrow: 0 }}>
                <input
                  value={String(qty)}
                  onChange={handleInput}
                  type="number"
                  style={{ width: '100%', height: '24px', fontFamily: 'Manrope', fontStyle: 'normal', fontWeight: 400, fontSize: '14px', lineHeight: '24px', textAlign: 'center', color: '#1A1C1F', border: 'none', outline: 'none', background: 'transparent', padding: 0, margin: 0, appearance: 'textfield' }}
                />
              </div>
              <button
                onClick={() => onChangeQty(id, qty + 1)}
                style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4px 12px', width: '35.77px', height: '32px', borderLeft: '1px solid #C3C6D4', flex: 'none', order: 2, flexGrow: 0, background: 'none', cursor: 'pointer' }}
              >
                <span style={{ width: '10.77px', height: '24px', fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 700, fontSize: '16px', lineHeight: '24px', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#002B73', flex: 'none', order: 0, flexGrow: 0 }}>+</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', padding: 0, width: '111px', height: '34px', flex: 'none', order: 1, flexGrow: 0 }}>
              <div style={{ fontFamily: 'Manrope', fontStyle: 'normal', fontWeight: 600, fontSize: '24px', lineHeight: '32px', textAlign: 'right', color: '#1D2128' }}>
                Rs{(price * qty).toFixed(2)}
              </div>
            </div>
        </div>
      </div>
    </article>
  );
}
