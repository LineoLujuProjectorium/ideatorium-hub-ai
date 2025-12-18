import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/engine/store/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.projectId },
      include: {
        steps: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch project status' },
      { status: 500 }
    );
  }
}