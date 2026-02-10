"use client";

import { useEffect, useState } from "react";
import {
    SocialPlatform,
    SocialAccount,
    getSocialAccounts,
    connectSocialAccount,
    disconnectSocialAccount,
    deleteAccount
} from "@/app/actions/settings-actions";
import { SocialConnectionCard } from "@/components/dashboard/settings/social-connection-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Trash2, Youtube, Instagram, Facebook } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [accounts, setAccounts] = useState<SocialAccount[]>([]);
    const [loading, setLoading] = useState<string | null>(null); // platform name or 'delete'
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        setFetching(true);
        const result = await getSocialAccounts();
        if (result.success && result.accounts) {
            setAccounts(result.accounts);
        } else {
            toast({
                title: "Error",
                description: "Failed to load social accounts.",
                variant: "destructive",
            });
        }
        setFetching(false);
    };

    const handleConnect = async (platform: SocialPlatform) => {
        setLoading(platform);
        try {
            const result = await connectSocialAccount(platform);
            if (result.success) {
                toast({
                    title: "Connected",
                    description: `Successfully connected to ${platform}.`,
                });
                await fetchAccounts();
            } else {
                toast({
                    title: "Connection Failed",
                    description: 'error' in result ? result.error : "Could not connect account.",
                    variant: "destructive",
                });
            }
        } finally {
            setLoading(null);
        }
    };

    const handleDisconnect = async (platform: SocialPlatform) => {
        setLoading(platform);
        try {
            const result = await disconnectSocialAccount(platform);
            if (result.success) {
                toast({
                    title: "Disconnected",
                    description: `Successfully disconnected ${platform}.`,
                });
                await fetchAccounts();
            } else {
                toast({
                    title: "Disconnection Failed",
                    description: result.error || "Could not disconnect account.",
                    variant: "destructive",
                });
            }
        } finally {
            setLoading(null);
        }
    };

    const handleDeleteAccount = async () => {
        setLoading('delete');
        try {
            const result = await deleteAccount();
            if (result.success) {
                toast({
                    title: "Account Deleted",
                    description: "Your account has been permanently deleted.",
                });
                router.push("/"); // Redirect to home/login
            } else {
                toast({
                    title: "Error",
                    description: result.error || "Failed to delete account.",
                    variant: "destructive",
                });
                setLoading(null);
            }
        } catch (error) {
            setLoading(null);
            console.error(error);
        }
    };

    const getAccount = (platform: SocialPlatform) => accounts.find(a => a.platform === platform);

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your social connections and account preferences.
                </p>
            </div>

            <Separator />

            <div className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2">
                    {/* YouTube */}
                    <SocialConnectionCard
                        platform="youtube"
                        platformName="YouTube Channel"
                        description="Connect your YouTube channel to auto-publish Shorts."
                        icon={<Youtube className="h-6 w-6 text-red-600" />}
                        isConnected={!!getAccount('youtube')}
                        profileData={getAccount('youtube') ? {
                            name: getAccount('youtube')?.profile_name,
                            avatar_url: getAccount('youtube')?.profile_image
                        } : undefined}
                        isLoading={loading === 'youtube' || fetching}
                        onConnect={() => handleConnect('youtube')}
                        onDisconnect={() => handleDisconnect('youtube')}
                    />

                    {/* Instagram */}
                    <SocialConnectionCard
                        platform="instagram"
                        platformName="Instagram"
                        description="Connect Instagram to publish Reels."
                        icon={<Instagram className="h-6 w-6 text-pink-600" />}
                        isConnected={!!getAccount('instagram')}
                        profileData={getAccount('instagram') ? {
                            name: getAccount('instagram')?.profile_name,
                            avatar_url: getAccount('instagram')?.profile_image
                        } : undefined}
                        isLoading={loading === 'instagram' || fetching}
                        onConnect={() => handleConnect('instagram')}
                        onDisconnect={() => handleDisconnect('instagram')}
                    />

                    {/* TikTok */}
                    <SocialConnectionCard
                        platform="tiktok"
                        platformName="TikTok"
                        description="Connect TikTok to publish videos."
                        icon={
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                        }
                        isConnected={!!getAccount('tiktok')}
                        profileData={getAccount('tiktok') ? {
                            name: getAccount('tiktok')?.profile_name,
                            avatar_url: getAccount('tiktok')?.profile_image
                        } : undefined}
                        isLoading={loading === 'tiktok' || fetching}
                        onConnect={() => handleConnect('tiktok')}
                        onDisconnect={() => handleDisconnect('tiktok')}
                    />

                    {/* Facebook */}
                    <SocialConnectionCard
                        platform="facebook"
                        platformName="Facebook Page"
                        description="Connect Facebook Page to publish videos."
                        icon={<Facebook className="h-6 w-6 text-blue-600" />}
                        isConnected={!!getAccount('facebook')}
                        profileData={getAccount('facebook') ? {
                            name: getAccount('facebook')?.profile_name,
                            avatar_url: getAccount('facebook')?.profile_image
                        } : undefined}
                        isLoading={loading === 'facebook' || fetching}
                        onConnect={() => handleConnect('facebook')}
                        onDisconnect={() => handleDisconnect('facebook')}
                    />
                </div>
            </div>

            <Separator className="my-6" />

            {/* Danger Zone */}
            <Card className="border-red-100 bg-red-50/30">
                <CardHeader>
                    <CardTitle className="text-red-600 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" /> Danger Zone
                    </CardTitle>
                    <CardDescription>
                        Irreversible actions related to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="font-medium">Delete Account</p>
                            <p className="text-sm text-muted-foreground">
                                Permanently delete your account and all generated videos.
                            </p>
                        </div>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" disabled={loading === 'delete'}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {loading === 'delete' ? "Deleting..." : "Delete Account"}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove all your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white">
                                        Delete Account
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
