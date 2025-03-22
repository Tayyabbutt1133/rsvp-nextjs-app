import React from 'react'
import { GETRSVPS } from '@/app/server/Getrsps'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { House } from 'lucide-react';
import RsvpTable from '@/app/_components/RsvpTable';
import { SignOut } from '@/app/server/Auth';

export default async function RSVPS() {

  const { data, message, success } = await GETRSVPS();

  // Todo : redirect to login if there is no authentication
  
  return (
    <>
      <div className='container mx-auto mt-8 p-4'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>All RsVPs</h1>
          <div className='flex items-center gap-2'>
            <Link href={'/'}>
              <Button className={'cursor-pointer'} variant={'outline'}>
                <House/>
            </Button>
            </Link>
            {/* logout */}
            <form action={SignOut}>
              <Button className={'cursor-pointer'} variant={'outline'}>Sign out</Button>
              </form>
          </div>
        </div>
        {/* TABLE */}
        <RsvpTable data={data || []} />

    </div>
    </>
  )

}
