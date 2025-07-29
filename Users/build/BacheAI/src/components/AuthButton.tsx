'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { LogOut, User as UserIcon, Crown } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { generateAlias } from '@/lib/utils';
import Link from 'next/link';
import { Badge } from './ui/badge';

export default function AuthButton() {
  const { user, loading, signOut } = useAuth();
  const [alias, setAlias] = useState('');

  useEffect(() => {
    if (user?.uid) {
      setAlias(generateAlias(user.uid));
    }
  }, [user]);

  if (loading) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  if (!user) {
    return (
        <Button asChild>
            <Link href="/login">Iniciar Sesión</Link>
        </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-transparent hover:border-primary transition-colors">
             <AvatarImage src={user.photoURL || undefined} alt="User Avatar" />
            <AvatarFallback>{alias.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{alias}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.isAnonymous ? 'Perfil Anónimo' : user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        {user.isAnonymous && (
            <>
            <DropdownMenuSeparator />
            <Link href="/perfil" passHref>
                <DropdownMenuItem className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-900 dark:text-yellow-300 focus:bg-yellow-200 dark:focus:bg-yellow-900/80 cursor-pointer">
                    <Crown className="mr-2 h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <span>¡Conviértete en Permanente!</span>
                </DropdownMenuItem>
            </Link>
            </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/perfil" passHref>
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
