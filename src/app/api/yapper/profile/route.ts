import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { username, email, bio, profileImage, emailNotifications, yapperId } = data;

    // Validate required fields
    if (!yapperId) {
      return NextResponse.json(
        { error: 'Yapper ID is required' },
        { status: 400 }
      );
    }

    // First, check if the yapper exists
    const existingYapper = await prisma.yapper.findUnique({
      where: { id: yapperId },
    });

    if (!existingYapper) {
      return NextResponse.json(
        { error: 'Yapper not found' },
        { status: 404 }
      );
    }

    // Create update data object with only the fields that are provided
    const updateData: Prisma.YapperUpdateInput = {};
    
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (bio !== undefined) updateData.bio = bio;
    if (profileImage !== undefined) updateData.profileImage = profileImage;
    if (emailNotifications !== undefined) updateData.emailNotifications = emailNotifications;

    // Update the yapper profile
    const updatedYapper = await prisma.yapper.update({
      where: {
        id: yapperId,
      },
      data: updateData,
    });

    return NextResponse.json(updatedYapper);
  } catch (error) {
    console.error('Error updating profile:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: 'Database error occurred', details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 