# Login Test Plan — SauceDemo

**Module**: Authentication / Login  
**URL**: https://www.saucedemo.com/  
**Last Updated**: 2026-05-18

---

## Overview

Test cases ini mencakup skenario login untuk **semua tipe user** yang tersedia di aplikasi SauceDemo. Setiap skenario bersifat independen dan dapat dijalankan dalam urutan apapun.

---

## Test Scenarios

---

### TC-LOGIN-01 — Login Berhasil sebagai Standard User

**User**: `standard_user`  
**Password**: `secret_sauce`  
**Type**: Happy Path

**Steps**:

1. Buka halaman `https://www.saucedemo.com/`
2. Isi field **Username** dengan `standard_user`
3. Isi field **Password** dengan `secret_sauce`
4. Klik tombol **Login**

**Expected Outcome**:

- Halaman produk (inventory) berhasil dimuat
- Header dengan teks **"Swag Labs"** terlihat
- Daftar produk dengan judul **"Products"** tampil di halaman

---

### TC-LOGIN-02 — Login Gagal sebagai Locked Out User

**User**: `locked_out_user`  
**Password**: `secret_sauce`  
**Type**: Negative — Akun Diblokir

**Steps**:

1. Buka halaman `https://www.saucedemo.com/`
2. Isi field **Username** dengan `locked_out_user`
3. Isi field **Password** dengan `secret_sauce`
4. Klik tombol **Login**

**Expected Outcome**:

- Halaman login tetap tampil (tidak berpindah ke inventory)
- Pesan error **"Epic sadface: Sorry, this user has been locked out."** tampil
- Field Username dan Password menampilkan indikator error (border merah / ikon ✕)

---

### TC-LOGIN-03 — Login Berhasil sebagai Problem User

**User**: `problem_user`  
**Password**: `secret_sauce`  
**Type**: Happy Path — Dengan Anomali UI

**Steps**:

1. Buka halaman `https://www.saucedemo.com/`
2. Isi field **Username** dengan `problem_user`
3. Isi field **Password** dengan `secret_sauce`
4. Klik tombol **Login**

**Expected Outcome**:

- Halaman inventory berhasil dimuat
- Header dengan teks **"Swag Labs"** terlihat
- Daftar produk dengan judul **"Products"** tampil di halaman
- _(Catatan: Beberapa gambar produk mungkin tampil tidak benar — ini adalah perilaku yang diharapkan untuk user ini)_

---

### TC-LOGIN-04 — Login Berhasil sebagai Performance Glitch User

**User**: `performance_glitch_user`  
**Password**: `secret_sauce`  
**Type**: Happy Path — Dengan Delay Performa

**Steps**:

1. Buka halaman `https://www.saucedemo.com/`
2. Isi field **Username** dengan `performance_glitch_user`
3. Isi field **Password** dengan `secret_sauce`
4. Klik tombol **Login**

**Expected Outcome**:

- Halaman inventory akhirnya berhasil dimuat (dengan sedikit keterlambatan)
- Header dengan teks **"Swag Labs"** terlihat
- Daftar produk dengan judul **"Products"** tampil di halaman

---

### TC-LOGIN-05 — Login Berhasil sebagai Error User

**User**: `error_user`  
**Password**: `secret_sauce`  
**Type**: Happy Path — Dengan Potensi Error pada Fitur Tertentu

**Steps**:

1. Buka halaman `https://www.saucedemo.com/`
2. Isi field **Username** dengan `error_user`
3. Isi field **Password** dengan `secret_sauce`
4. Klik tombol **Login**

**Expected Outcome**:

- Halaman inventory berhasil dimuat
- Header dengan teks **"Swag Labs"** terlihat
- Daftar produk dengan judul **"Products"** tampil di halaman

---

### TC-LOGIN-06 — Login Berhasil sebagai Visual User

**User**: `visual_user`  
**Password**: `secret_sauce`  
**Type**: Happy Path — Dengan Anomali Visual

**Steps**:

1. Buka halaman `https://www.saucedemo.com/`
2. Isi field **Username** dengan `visual_user`
3. Isi field **Password** dengan `secret_sauce`
4. Klik tombol **Login**

**Expected Outcome**:

- Halaman inventory berhasil dimuat
- Header dengan teks **"Swag Labs"** terlihat
- Daftar produk dengan judul **"Products"** tampil di halaman

---

### TC-LOGIN-07 — Login dengan Username Kosong

**User**: _(kosong)_  
**Password**: `secret_sauce`  
**Type**: Negative — Validasi Field Wajib

**Steps**:

1. Buka halaman `https://www.saucedemo.com/`
2. Biarkan field **Username** kosong
3. Isi field **Password** dengan `secret_sauce`
4. Klik tombol **Login**

**Expected Outcome**:

- Halaman login tetap tampil
- Pesan error **"Epic sadface: Username is required"** tampil
- Field Username menampilkan indikator error

---

### TC-LOGIN-08 — Login dengan Password Kosong

**User**: `standard_user`  
**Password**: _(kosong)_  
**Type**: Negative — Validasi Field Wajib

**Steps**:

1. Buka halaman `https://www.saucedemo.com/`
2. Isi field **Username** dengan `standard_user`
3. Biarkan field **Password** kosong
4. Klik tombol **Login**

**Expected Outcome**:

- Halaman login tetap tampil
- Pesan error **"Epic sadface: Password is required"** tampil
- Field Password menampilkan indikator error

---

### TC-LOGIN-09 — Login dengan Kredensial Salah

**User**: `wrong_user`  
**Password**: `wrong_password`  
**Type**: Negative — Kredensial Tidak Valid

**Steps**:

1. Buka halaman `https://www.saucedemo.com/`
2. Isi field **Username** dengan `wrong_user`
3. Isi field **Password** dengan `wrong_password`
4. Klik tombol **Login**

**Expected Outcome**:

- Halaman login tetap tampil
- Pesan error **"Epic sadface: Username and password do not match any user in this service"** tampil
- Field Username dan Password menampilkan indikator error

---

## Summary

| TC ID       | Skenario                            | User                    | Type     |
| ----------- | ----------------------------------- | ----------------------- | -------- |
| TC-LOGIN-01 | Login berhasil                      | standard_user           | Positive |
| TC-LOGIN-02 | Login ditolak (akun diblokir)       | locked_out_user         | Negative |
| TC-LOGIN-03 | Login berhasil (problem user)       | problem_user            | Positive |
| TC-LOGIN-04 | Login berhasil (performance glitch) | performance_glitch_user | Positive |
| TC-LOGIN-05 | Login berhasil (error user)         | error_user              | Positive |
| TC-LOGIN-06 | Login berhasil (visual user)        | visual_user             | Positive |
| TC-LOGIN-07 | Login gagal — username kosong       | _(kosong)_              | Negative |
| TC-LOGIN-08 | Login gagal — password kosong       | standard_user           | Negative |
| TC-LOGIN-09 | Login gagal — kredensial salah      | wrong_user              | Negative |
