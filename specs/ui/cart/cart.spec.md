# Cart Test Plan

## Application Overview

Test plan for the Shopping Cart functionality on SauceDemo (https://www.saucedemo.com/). Covers adding single items, adding all items, removing items, and verifying cart state changes. Uses standard_user credentials and data-test selectors for reliable automation with Playwright.

## Test Scenarios

### 1. Cart Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC-CART-01 - Menambahkan satu item ke keranjang

**File:** `tests/ui/cart/cart.spec.ts`

**Steps:**
  1. Login sebagai standard_user dengan password secret_sauce
    - expect: Halaman inventory berhasil dimuat dengan header 'Products' terlihat
  2. Klik tombol 'Add to cart' pada item pertama (Sauce Labs Backpack)
    - expect: Tombol 'Add to cart' pada Sauce Labs Backpack berubah menjadi tombol 'Remove' dengan data-test='remove-sauce-labs-backpack'
  3. Periksa badge keranjang belanja di header
    - expect: Badge keranjang belanja muncul dengan angka '1' pada elemen [data-test='shopping-cart-badge']
  4. Klik link keranjang belanja [data-test='shopping-cart-link'] untuk membuka halaman cart
    - expect: Halaman cart menampilkan judul 'Your Cart' dan satu item 'Sauce Labs Backpack' dengan harga $29.99 beserta tombol 'Remove'

#### 1.2. TC-CART-02 - Menambahkan semua item ke keranjang

**File:** `tests/ui/cart/cart.spec.ts`

**Steps:**
  1. Login sebagai standard_user dengan password secret_sauce
    - expect: Halaman inventory berhasil dimuat dengan 6 produk terlihat
  2. Klik 'Add to cart' pada Sauce Labs Backpack
    - expect: Tombol 'Add to cart' pada Sauce Labs Backpack berubah menjadi 'Remove'
  3. Klik 'Add to cart' pada Sauce Labs Bike Light
    - expect: Tombol 'Add to cart' pada Sauce Labs Bike Light berubah menjadi 'Remove'
  4. Klik 'Add to cart' pada Sauce Labs Bolt T-Shirt
    - expect: Tombol 'Add to cart' pada Sauce Labs Bolt T-Shirt berubah menjadi 'Remove'
  5. Klik 'Add to cart' pada Sauce Labs Fleece Jacket
    - expect: Tombol 'Add to cart' pada Sauce Labs Fleece Jacket berubah menjadi 'Remove'
  6. Klik 'Add to cart' pada Sauce Labs Onesie
    - expect: Tombol 'Add to cart' pada Sauce Labs Onesie berubah menjadi 'Remove'
  7. Klik 'Add to cart' pada Test.allTheThings() T-Shirt (Red)
    - expect: Tombol 'Add to cart' pada Test.allTheThings() T-Shirt (Red) berubah menjadi 'Remove'
  8. Verifikasi badge keranjang dan status semua tombol
    - expect: Badge keranjang belanja menampilkan angka '6' pada elemen [data-test='shopping-cart-badge'] dan tidak ada lagi tombol 'Add to cart' yang tersisa (semua 6 tombol berubah menjadi 'Remove')
  9. Klik link keranjang belanja [data-test='shopping-cart-link'] untuk membuka halaman cart
    - expect: Halaman cart menampilkan judul 'Your Cart' dan keenam item dengan nama, deskripsi, harga, dan tombol 'Remove' masing-masing: Sauce Labs Backpack ($29.99), Sauce Labs Bike Light ($9.99), Sauce Labs Bolt T-Shirt ($15.99), Sauce Labs Fleece Jacket ($49.99), Sauce Labs Onesie ($7.99), Test.allTheThings() T-Shirt (Red) ($15.99)

#### 1.3. TC-CART-03 - Menambahkan item lalu menghapus semua item dari keranjang

**File:** `tests/ui/cart/cart.spec.ts`

**Steps:**
  1. Login sebagai standard_user dengan password secret_sauce
    - expect: Halaman inventory berhasil dimuat dengan header 'Products' terlihat
  2. Klik 'Add to cart' pada Sauce Labs Backpack
    - expect: Tombol 'Add to cart' berubah menjadi 'Remove' untuk item yang ditambahkan
  3. Klik 'Add to cart' pada Sauce Labs Bike Light
    - expect: Tombol 'Add to cart' berubah menjadi 'Remove' untuk item yang ditambahkan
  4. Klik 'Add to cart' pada Sauce Labs Bolt T-Shirt
    - expect: Tombol 'Add to cart' berubah menjadi 'Remove' untuk item yang ditambahkan
  5. Verifikasi badge keranjang menampilkan angka 3
    - expect: Badge keranjang belanja menampilkan angka '3' pada elemen [data-test='shopping-cart-badge']
  6. Klik link keranjang belanja [data-test='shopping-cart-link'] untuk membuka halaman cart
    - expect: Halaman cart menampilkan judul 'Your Cart' dan ketiga item terlihat dengan tombol 'Remove' masing-masing
  7. Klik tombol 'Remove' pada Sauce Labs Backpack
    - expect: Item Sauce Labs Backpack hilang dari daftar cart dan badge berkurang menjadi '2'
  8. Klik tombol 'Remove' pada Sauce Labs Bike Light
    - expect: Item Sauce Labs Bike Light hilang dari daftar cart dan badge berkurang menjadi '1'
  9. Klik tombol 'Remove' pada Sauce Labs Bolt T-Shirt
    - expect: Item Sauce Labs Bolt T-Shirt hilang dari daftar cart dan badge keranjang [data-test='shopping-cart-badge'] tidak lagi terlihat di header
  10. Verifikasi keranjang kosong - tidak ada item tersisa
    - expect: Halaman cart masih menampilkan judul 'Your Cart' tetapi tidak ada item yang terdaftar (tidak ada elemen [data-test='inventory-item']), tombol 'Continue Shopping' dan 'Checkout' masih terlihat

#### 1.4. TC-CART-04 - Badge keranjang tidak terlihat saat keranjang kosong

**File:** `tests/ui/cart/cart.spec.ts`

**Steps:**
  1. Login sebagai standard_user dengan password secret_sauce
    - expect: Halaman inventory berhasil dimuat
  2. Verifikasi bahwa badge keranjang belanja tidak muncul
    - expect: Elemen [data-test='shopping-cart-badge'] tidak terlihat di halaman karena keranjang masih kosong

#### 1.5. TC-CART-05 - Menghapus item langsung dari halaman inventory

**File:** `tests/ui/cart/cart.spec.ts`

**Steps:**
  1. Login sebagai standard_user dengan password secret_sauce
    - expect: Halaman inventory berhasil dimuat
  2. Klik 'Add to cart' pada Sauce Labs Backpack
    - expect: Tombol berubah menjadi 'Remove' dan badge keranjang menampilkan '1'
  3. Klik tombol 'Remove' pada Sauce Labs Backpack langsung dari halaman inventory
    - expect: Tombol berubah kembali menjadi 'Add to cart', badge keranjang [data-test='shopping-cart-badge'] tidak lagi terlihat

#### 1.6. TC-CART-06 - Tombol Continue Shopping kembali ke halaman inventory

**File:** `tests/ui/cart/cart.spec.ts`

**Steps:**
  1. Login sebagai standard_user dengan password secret_sauce
    - expect: Halaman inventory berhasil dimuat
  2. Klik 'Add to cart' pada Sauce Labs Backpack
    - expect: Tombol berubah menjadi 'Remove' dan badge menampilkan '1'
  3. Klik link keranjang belanja [data-test='shopping-cart-link']
    - expect: Halaman cart terbuka dengan judul 'Your Cart' dan item Sauce Labs Backpack terlihat
  4. Klik tombol 'Continue Shopping' [data-test='continue-shopping']
    - expect: Halaman inventory muncul kembali dengan judul 'Products' dan tombol pada Sauce Labs Backpack masih dalam status 'Remove' (item tetap di keranjang)

#### 1.7. TC-CART-07 - Menambahkan item yang sama berulang kali tidak menggandakan item

**File:** `tests/ui/cart/cart.spec.ts`

**Steps:**
  1. Login sebagai standard_user dengan password secret_sauce
    - expect: Halaman inventory berhasil dimuat
  2. Klik 'Add to cart' pada Sauce Labs Backpack
    - expect: Tombol berubah menjadi 'Remove' dan badge menampilkan '1'
  3. Klik tombol 'Remove' pada Sauce Labs Backpack
    - expect: Tombol berubah kembali menjadi 'Add to cart' dan badge keranjang [data-test='shopping-cart-badge'] tidak lagi terlihat
  4. Klik 'Add to cart' pada Sauce Labs Backpack sekali lagi
    - expect: Badge menampilkan '1' (tidak bertambah menjadi 2), tombol berubah menjadi 'Remove' - item tidak terduplikasi
  5. Klik link keranjang belanja dan verifikasi isi cart
    - expect: Halaman cart menampilkan hanya satu item Sauce Labs Backpack dengan quantity '1'

#### 1.8. TC-CART-08 - Menghapus semua item dari cart lalu menambahkan item baru

**File:** `tests/ui/cart/cart.spec.ts`

**Steps:**
  1. Login sebagai standard_user dengan password secret_sauce
    - expect: Halaman inventory berhasil dimuat
  2. Klik 'Add to cart' pada Sauce Labs Backpack
    - expect: Tombol berubah menjadi 'Remove' dan badge menampilkan '1'
  3. Klik link keranjang belanja, lalu klik 'Remove' pada item
    - expect: Badge keranjang tidak lagi terlihat, halaman cart kosong (tidak ada [data-test='inventory-item'])
  4. Klik tombol 'Continue Shopping'
    - expect: Halaman inventory muncul dengan semua tombol dalam status 'Add to cart'
  5. Klik 'Add to cart' pada Sauce Labs Fleece Jacket
    - expect: Tombol berubah menjadi 'Remove' dan badge keranjang muncul kembali dengan angka '1'
  6. Klik link keranjang belanja dan verifikasi isi cart
    - expect: Halaman cart menampilkan hanya satu item: Sauce Labs Fleece Jacket dengan harga $49.99
