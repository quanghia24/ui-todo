ALTER TABLE "post_categoris" RENAME TO "post_categories";--> statement-breakpoint
ALTER TABLE "post_categories" DROP CONSTRAINT "post_categoris_postId_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "post_categories" DROP CONSTRAINT "post_categoris_categoryId_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "post_categories" DROP CONSTRAINT "post_categoris_postId_categoryId_pk";--> statement-breakpoint
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_postId_categoryId_pk" PRIMARY KEY("postId","categoryId");--> statement-breakpoint
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;