insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-images',
  'portfolio-images',
  true,
  10485760,
  array['image/avif', 'image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do update set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Portfolio admins can upload portfolio images" on storage.objects;
create policy "Portfolio admins can upload portfolio images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'portfolio-images'
    and (select public.is_portfolio_admin())
  );
