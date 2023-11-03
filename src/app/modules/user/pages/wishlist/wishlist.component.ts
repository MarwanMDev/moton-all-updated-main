import { Component, OnInit } from '@angular/core';
import { Wish } from 'src/app/core/interfaces/wish';
import { WishlistService } from 'src/app/core/services/whishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishes: Wish[] = [];
  isLoading: boolean = false;
  constructor(private wishlistService: WishlistService) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.wishlistService.getUserWishlist().subscribe((response) => {
      this.wishes = response.data;
      this.isLoading = false;
    });
  }

  removeBookFromWishlist(bookId: string) {
    this.wishlistService
      .removeBookFromWishlist(bookId)
      .subscribe((response) => {
        this.wishlistService
          .getUserWishlist()
          .subscribe((response) => {
            this.wishes = response.data;
            this.isLoading = false;
          });
      });
  }
}
